'use client';
import { useEffect, useRef, useState } from 'react';
import { Feature, FeatureCollection } from 'geojson';
import mapboxgl, { GeoJSONSource, LngLat, Map as MapboxMap, MapMouseEvent } from 'mapbox-gl';

import { useStore } from '@/store';
import { Roadtrip, Locale, Image } from '@/types';

import styles from './roadtrips.module.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import classNames from 'classnames';
import { isPointFeature } from '@/utils';

const ROUTE_SOURCE = 'route-source';
const MARKER_SOURCE = 'marker-source';
const IMAGE_SOURCE = 'image-source';
const ROUTE_LAYER = 'route-layer';
const MARKER_LAYER = 'marker-layer';
const IMAGE_LAYER = 'image-layer';

interface Properties {}

export default function Trig() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);
  const [loadingLocales, setLoadingLocales] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

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

      if (!map.current.getSource(IMAGE_SOURCE)) {
        map.current.addSource(IMAGE_SOURCE, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
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

      if (!map.current.getLayer(IMAGE_LAYER)) {
        map.current.addLayer({
          id: IMAGE_LAYER,
          source: IMAGE_SOURCE,
          type: 'circle',
          paint: { 'circle-radius': 4, 'circle-color': 'red', 'circle-stroke-width': 2 },
        });
      }

      const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, maxWidth: '420px' });

      map.current.on('mouseenter', IMAGE_LAYER, (event: MapMouseEvent) => {
        if (!map.current) return;

        map.current.getCanvas().style.cursor = 'pointer';

        if (!event.features?.length) return;

        const [feature] = event.features;

        if (!isPointFeature(feature)) return;

        const coordinates = new LngLat(feature.geometry.coordinates[0], feature.geometry.coordinates[1]);
        const { html } = feature.properties!;

        popup.setLngLat(coordinates).setHTML(html).addTo(map.current);
      });

      map.current.on('mouseleave', IMAGE_LAYER, () => {
        map.current!.getCanvas().style.cursor = '';
        popup.remove();
      });
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

    // clear previous interval and sourcea

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    setRoadtripLocales(null);
    map.current?.getSource<GeoJSONSource>(ROUTE_SOURCE)?.setData({ type: 'FeatureCollection', features: [] });
    map.current?.getSource<GeoJSONSource>(MARKER_SOURCE)?.setData({ type: 'FeatureCollection', features: [] });

    // get selected roadtrip positions

    setLoadingLocales(true);
    setSelectedRoadtripId(id);

    const response = await fetch(`/api/roadtrip/get/${id}`, { method: 'GET' });
    const { locales, images }: { locales: Locale[]; images: Image[] } = await response.json();
    setRoadtripLocales(locales);

    // add roadtrip positions to map

    const coordinates = locales.map((locale) => [locale.position.lng, locale.position.lat]);

    const routeFeatureCollection: FeatureCollection = {
      type: 'FeatureCollection',
      features: [{ type: 'Feature', geometry: { type: 'LineString', coordinates }, properties: {} }],
    };

    map.current?.getSource<GeoJSONSource>(ROUTE_SOURCE)?.setData(routeFeatureCollection);

    // add image markers to map

    const imageFeatures: Feature[] = images.map((image) => {
      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [image.position.lng, image.position.lat] },
        properties: {
          html: `<img src="${image.url}" alt="${image.description}" width="${image.width}" /><p>${image.description}</p>`,
        },
      };
    });

    const imageFeatureCollection: FeatureCollection = { type: 'FeatureCollection', features: imageFeatures };

    map.current?.getSource<GeoJSONSource>(IMAGE_SOURCE)?.setData(imageFeatureCollection);

    setLoadingLocales(false);

    // add a moving marker to map

    let index = 0;

    const currentIntervalId = setInterval(() => {
      if (index >= locales.length) return;

      const { position } = locales[index];
      const coordinates = [position.lng, position.lat];

      const markerFeatureCollection: FeatureCollection = {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', geometry: { type: 'Point', coordinates }, properties: {} }],
      };

      map.current?.getSource<GeoJSONSource>(MARKER_SOURCE)?.setData(markerFeatureCollection);

      index++;

      if (index === locales.length) {
        clearInterval(currentIntervalId);
        setIntervalId(null);
        map.current?.getSource<GeoJSONSource>(MARKER_SOURCE)?.setData({ type: 'FeatureCollection', features: [] });
      }
    }, 1);

    setIntervalId(currentIntervalId);
  }

  return (
    <>
      <div ref={mapContainer} className={styles.mapContainer} />
      {roadtrips?.length && (
        <div className={styles.roadtripPanelContainer}>
          {roadtrips?.map((roadtrip) => (
            <div
              key={roadtrip.id}
              className={classNames(styles.roadtripPanel, {
                [styles.selectedRoadtripPanel]: roadtrip.id === selectedRoadtripId,
              })}
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
