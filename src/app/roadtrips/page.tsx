'use client';
import { useEffect, useRef, useState } from 'react';
import { Feature, FeatureCollection, Point } from 'geojson';
import mapboxgl, { GeoJSONSource, Map as MapboxMap } from 'mapbox-gl';

import { useStore } from '@/store';
import { Roadtrip, Locale } from '@/types';

import styles from './roadtrips.module.css';

const ROUTE_SOURCE = 'route-source';
const MARKER_SOURCE = 'marker-source';
const ROUTE_LAYER = 'route-layer';
const MARKER_LAYER = 'marker-layer';

interface Properties {}

export default function Trig() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);
  const [loadingLocales, setLoadingLocales] = useState(false);

  const { roadtrips, selectedRoadtripId, setRoadTrips, setSelectedRoadtripId, setRoadtripLocales } = useStore();

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

      if (!map.current.getSource(ROUTE_SOURCE)) {
        map.current.addSource(ROUTE_SOURCE, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      }

      if (!map.current.getSource(MARKER_SOURCE)) {
        map.current.addSource(MARKER_SOURCE, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      }

      if (!map.current.getLayer(ROUTE_LAYER)) {
        map.current.addLayer({
          id: ROUTE_LAYER,
          source: ROUTE_SOURCE,
          type: 'line',
          paint: { 'line-color': '#da1e28', 'line-width': 3 },
        });
      }

      if (!map.current.getLayer(MARKER_LAYER)) {
        map.current.addLayer({
          id: MARKER_LAYER,
          source: MARKER_SOURCE,
          type: 'circle',
          paint: { 'circle-radius': 6, 'circle-color': 'green', 'circle-stroke-width': 2 },
        });
      }
    });

    // map.current.on('mouseenter', ROUTE_LAYER, () => (map.current!.getCanvas().style.cursor = 'pointer'));
    // map.current.on('mouseleave', ROUTE_LAYER, () => (map.current!.getCanvas().style.cursor = 'default'));
  }, []);

  useEffect(() => {
    const features: Feature<Point, Properties>[] = [];

    const featureCollection: FeatureCollection<Point, Properties> = {
      type: 'FeatureCollection',
      features,
    };
    map.current?.getSource<GeoJSONSource>(ROUTE_SOURCE)?.setData(featureCollection);
  }, []);

  useEffect(() => {
    map.current?.on('click', ROUTE_LAYER, ({ features, lngLat, originalEvent }) => {
      originalEvent.preventDefault();
      console.log('click', features, lngLat);
    });

    map.current?.on('click', ({ originalEvent }) => {
      if (originalEvent.defaultPrevented) return;
      console.log('click', originalEvent);
    });
  }, []);

  useEffect(() => {
    async function getRoadtrips() {
      const response = await fetch('/api/roadtrip/get', { method: 'GET' });
      const responseJson: Roadtrip[] = await response.json();
      setRoadTrips(responseJson);
    }

    getRoadtrips();
  }, [setRoadTrips]);

  async function getRoadtripPositions(id: number) {
    if (id === selectedRoadtripId) return;

    setLoadingLocales(true);
    setSelectedRoadtripId(id);

    const response = await fetch(`/api/roadtrip/get/${id}`, { method: 'GET' });
    const responseJson: Locale[] = await response.json();
    setRoadtripLocales(responseJson);

    const coordinates = responseJson.map((locale) => [locale.position.lng, locale.position.lat]);

    const featureCollection: FeatureCollection = {
      type: 'FeatureCollection',
      features: [{ type: 'Feature', geometry: { type: 'LineString', coordinates }, properties: {} }],
    };

    map.current?.getSource<GeoJSONSource>(ROUTE_SOURCE)?.setData(featureCollection);

    setLoadingLocales(false);

    let i = 0;

    setInterval(() => {
      console.log('interval', i);
      if (i >= responseJson.length) return;

      const { position } = responseJson[i];
      const coordinates = [position.lng, position.lat];

      const featureCollection: FeatureCollection = {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', geometry: { type: 'Point', coordinates }, properties: {} }],
      };

      map.current?.getSource<GeoJSONSource>(MARKER_SOURCE)?.setData(featureCollection);

      i++;
    }, 10);
  }

  return (
    <>
      <div ref={mapContainer} className={styles.mapContainer} />
      {roadtrips?.length && (
        <div className={styles.roadtripPanelContainer}>
          {roadtrips?.map((roadtrip) => (
            <div
              key={roadtrip.id}
              className={styles.roadtripPanel}
              onClick={() => !loadingLocales && getRoadtripPositions(roadtrip.id)}
            >
              <h1>{roadtrip.name}</h1>
              <p>{roadtrip.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
