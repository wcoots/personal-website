'use client';
import { useEffect, useRef } from 'react';
import { Feature, FeatureCollection, Point } from 'geojson';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';

import { useStore } from '@/store';
import { TrigTable as TrigPoint } from '@/postgres-schema';
import { TrigDetails } from '@/components';

import styles from './trig.module.css';

const POINT_SOURCE = 'point-source';
const POINT_LAYER = 'point-layer';
const SELECTED_POINT_LAYER = 'selected-point-layer';
const SELECTED_POINT_SOURCE = 'selected-point-source';

interface Properties {
  id: string;
  colour: string;
}

const trigConditionColourMap: { [key: string]: string } = {
  Good: '#43aa8b',
  'Slightly damaged': '#90be6d',
  Damaged: '#c6e18b',
  Toppled: '#f9c74f',
  Converted: '#f3722c',
  Remains: '#f3722c',
  Destroyed: '#e63946',
  'Not Logged': '#808080',
  Unknown: '#808080',
  'Possibly missing': '#bbbbbb',
  Moved: '#ffffff',
  'Unreachable but visible': '#444444',
  Inaccessible: '#000000',
};

export default function Trig() {
  const { trigPoints, selectedTrigPoint, setTrigPoints, setSelectedTrigPoint } = useStore();

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    mapboxgl.accessToken = process.env.MAPBOX_API_KEY!;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-4, 54.2],
      zoom: 5,
      minZoom: 5,
      maxBounds: [
        [-12, 49],
        [5, 61],
      ],
      projection: 'naturalEarth',
    });

    map.current.on('load', () => {
      if (!map.current) return;

      map.current.dragRotate.disable();
      map.current.touchZoomRotate.disableRotation();
      map.current.touchPitch.disable();

      if (!map.current.getSource(POINT_SOURCE)) {
        map.current.addSource(POINT_SOURCE, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      }

      if (!map.current.getSource(SELECTED_POINT_SOURCE)) {
        map.current.addSource(SELECTED_POINT_SOURCE, {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] },
        });
      }

      if (!map.current.getLayer(POINT_LAYER)) {
        map.current.addLayer({
          id: POINT_LAYER,
          source: POINT_SOURCE,
          type: 'circle',
          paint: { 'circle-color': ['get', 'colour'], 'circle-stroke-width': 0.5, 'circle-radius': 4 },
        });
      }

      if (!map.current.getLayer(SELECTED_POINT_LAYER)) {
        map.current.addLayer({
          id: SELECTED_POINT_LAYER,
          source: SELECTED_POINT_SOURCE,
          type: 'circle',
          paint: { 'circle-color': ['get', 'colour'], 'circle-stroke-width': 2, 'circle-radius': 6 },
        });
      }
    });
  }, []);

  useEffect(() => {
    map.current?.on('click', POINT_LAYER, ({ features, lngLat }) => {
      const selectedPointSource = map.current?.getSource(SELECTED_POINT_SOURCE);
      if (selectedPointSource?.type !== 'geojson') return;

      if (features?.length === 1) {
        const [feature] = features;
        const trigPoint = trigPoints?.find((tp) => tp.id === feature.properties?.id);
        if (!trigPoint) return;

        const colour = trigConditionColourMap[trigPoint?.condition] || '#808080';
        const properties: Properties = { id: trigPoint.id, colour };
        const geometry: Point = { type: 'Point', coordinates: [trigPoint.longitude, trigPoint.latitude] };
        const featureCollection: FeatureCollection<Point, Properties> = {
          type: 'FeatureCollection',
          features: [{ type: 'Feature', properties, geometry }],
        };

        setSelectedTrigPoint(trigPoint);
        selectedPointSource.setData(featureCollection);
      } else {
        if (features && features?.length > 1) {
          const currentZoom = map.current?.getZoom();
          if (!currentZoom) return;
          map.current?.flyTo({ center: lngLat, zoom: currentZoom + 2 });
        }

        setSelectedTrigPoint(null);
        selectedPointSource.setData({ type: 'FeatureCollection', features: [] });
      }
    });
  }, [trigPoints, setSelectedTrigPoint]);

  useEffect(() => {
    async function getTrigPoints() {
      const response = await fetch('/api/trig-points/get', { method: 'GET' });
      const responseJson: TrigPoint[] = await response.json();
      setTrigPoints(responseJson);

      const features = responseJson.map((trigPoint): Feature<Point, Properties> => {
        const colour = trigConditionColourMap[trigPoint.condition] || '#808080';
        const properties: Properties = { id: trigPoint.id, colour };
        const geometry: Point = { type: 'Point', coordinates: [trigPoint.longitude, trigPoint.latitude] };

        return { type: 'Feature', properties, geometry };
      });

      const featureCollection: FeatureCollection<Point, Properties> = { type: 'FeatureCollection', features };

      const pointSource = map.current?.getSource(POINT_SOURCE);
      if (pointSource?.type === 'geojson') pointSource.setData(featureCollection);
    }

    getTrigPoints();
  }, [setTrigPoints]);

  return (
    <>
      <div ref={mapContainer} className={styles['map-container']} />
      {selectedTrigPoint && <TrigDetails trigPoint={selectedTrigPoint} />}
    </>
  );
}
