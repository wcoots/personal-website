'use client';
import { useEffect, useRef, useState } from 'react';
import { Feature, FeatureCollection } from 'geojson';
import mapboxgl, { GeoJSONSource, LngLat, LngLatBounds, Map as MapboxMap, MapMouseEvent } from 'mapbox-gl';

import { useStore } from '@/store';
import { Roadtrip, Locale, Marker } from '@/types';

import styles from './roadtrips.module.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import classNames from 'classnames';
import { isMobile, isPointFeature } from '@/utils';

const ROUTE_SOURCE = 'route-source';
const POSITION_SOURCE = 'position-source';
const MARKER_SOURCE = 'marker-source';
const ROUTE_LAYER = 'route-layer';
const POSITION_LAYER = 'position-layer';
const MARKER_LAYER = 'marker-layer';

export default function Trig() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);
  const fullWidth = !isMobile();
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
    });

    map.current.on('load', () => {
      if (!map.current) return;

      map.current.dragRotate.disable();
      map.current.touchZoomRotate.disableRotation();
      map.current.touchPitch.disable();

      if (!map.current.getSource(ROUTE_SOURCE)) {
        map.current.addSource(ROUTE_SOURCE, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      }

      if (!map.current.getSource(POSITION_SOURCE)) {
        map.current.addSource(POSITION_SOURCE, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
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

      if (!map.current.getLayer(POSITION_LAYER)) {
        map.current.addLayer({
          id: POSITION_LAYER,
          source: POSITION_SOURCE,
          type: 'symbol',
          layout: { 'icon-image': ['get', 'icon'], 'icon-size': 0.15, 'icon-allow-overlap': true },
        });
      }

      if (!map.current.getLayer(MARKER_LAYER)) {
        map.current.addLayer({
          id: MARKER_LAYER,
          source: MARKER_SOURCE,
          type: 'circle',
          paint: { 'circle-radius': 4, 'circle-color': ['get', 'colour'], 'circle-stroke-width': 2 },
        });
      }

      map.current?.loadImage(`/bike-left.png`, (error, image) => {
        if (error) return;
        if (image) map.current?.addImage('bike-left', image);
      });

      map.current?.loadImage(`/bike-right.png`, (error, image) => {
        if (error) return;
        if (image) map.current?.addImage('bike-right', image);
      });

      const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, maxWidth: '420px' });

      map.current.on('mouseenter', MARKER_LAYER, (event: MapMouseEvent) => {
        if (!map.current) return;

        map.current.getCanvas().style.cursor = 'pointer';

        if (!event.features?.length) return;

        const [feature] = event.features;

        if (!isPointFeature(feature)) return;

        const coordinates = new LngLat(feature.geometry.coordinates[0], feature.geometry.coordinates[1]);
        const { html } = feature.properties!;

        popup.setLngLat(coordinates).setHTML(html).addTo(map.current);
      });

      map.current.on('mouseleave', MARKER_LAYER, () => {
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
    map.current?.getSource<GeoJSONSource>(POSITION_SOURCE)?.setData({ type: 'FeatureCollection', features: [] });
    map.current?.getSource<GeoJSONSource>(MARKER_SOURCE)?.setData({ type: 'FeatureCollection', features: [] });

    // get selected roadtrip positions

    setLoadingLocales(true);
    setSelectedRoadtripId(id);

    const response = await fetch(`/api/roadtrip/get/${id}`, { method: 'GET' });
    const { locales, markers }: { locales: Locale[]; markers: Marker[] } = await response.json();
    setRoadtripLocales(locales);

    // add roadtrip positions to map

    const coordinates = locales.map((locale) => locale.position.coordinates);

    const routeFeatureCollection: FeatureCollection = {
      type: 'FeatureCollection',
      features: [{ type: 'Feature', geometry: { type: 'LineString', coordinates }, properties: {} }],
    };

    map.current?.getSource<GeoJSONSource>(ROUTE_SOURCE)?.setData(routeFeatureCollection);

    // add markers to map

    const markerFeatures: Feature[] = markers.map((marker) => {
      const imageHtml = marker.imageUrl
        ? `<img src="${marker.imageUrl}" alt="${marker.description}" width="${marker.imageWidth}" />`
        : '';

      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: marker.position.coordinates },
        properties: {
          html: `${imageHtml}<p>${marker.description}</p>`,
          colour: marker.iconType === 'photo' ? 'red' : 'green',
        },
      };
    });

    const markerFeatureCollection: FeatureCollection = { type: 'FeatureCollection', features: markerFeatures };

    map.current?.getSource<GeoJSONSource>(MARKER_SOURCE)?.setData(markerFeatureCollection);

    // fit map to bounds

    const maxLng = Math.max(...coordinates.map((coordinate) => coordinate[0]));
    const minLng = Math.min(...coordinates.map((coordinate) => coordinate[0]));
    const maxLat = Math.max(...coordinates.map((coordinate) => coordinate[1]));
    const minLat = Math.min(...coordinates.map((coordinate) => coordinate[1]));

    const swBound = new LngLat(minLng, minLat);
    const neBound = new LngLat(maxLng, maxLat);

    map.current?.fitBounds(new LngLatBounds(swBound, neBound), { padding: 50 });

    setLoadingLocales(false);

    // add a position marker to map

    const positionConfig = { index: 0, left: 0, right: 0, icon: 'bike-right' };

    const currentIntervalId = setInterval(() => {
      positionConfig.index++;
      if (positionConfig.index >= locales.length) return;

      const {
        position: { coordinates },
      } = locales[positionConfig.index];

      const {
        position: { coordinates: previousCoordinates },
      } = locales[positionConfig.index - 1];

      if (coordinates[0] > previousCoordinates[0]) {
        positionConfig.right++;
      } else {
        positionConfig.left++;
      }

      if (positionConfig.right > 500) {
        positionConfig.icon = 'bike-right';
        positionConfig.right = 0;
        positionConfig.left = 0;
      } else if (positionConfig.left > 500) {
        positionConfig.icon = 'bike-left';
        positionConfig.right = 0;
        positionConfig.left = 0;
      }

      const positionFeatureCollection: FeatureCollection = {
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', geometry: { type: 'Point', coordinates }, properties: { icon: positionConfig.icon } },
        ],
      };

      map.current?.getSource<GeoJSONSource>(POSITION_SOURCE)?.setData(positionFeatureCollection);

      if (positionConfig.index === locales.length) {
        clearInterval(currentIntervalId);
        setIntervalId(null);
        map.current?.getSource<GeoJSONSource>(POSITION_SOURCE)?.setData({ type: 'FeatureCollection', features: [] });
      }
    }, 1);

    setIntervalId(currentIntervalId);
  }

  return (
    <>
      <div
        ref={mapContainer}
        className={classNames({
          [styles.mapContainer]: fullWidth,
          [styles.mapContainerMobile]: !fullWidth,
        })}
      />
      {roadtrips?.length && (
        <div
          className={classNames({
            [styles.roadtripPanelContainer]: fullWidth,
            [styles.roadtripPanelContainerMobile]: !fullWidth,
          })}
        >
          {roadtrips?.map((roadtrip) => (
            <div
              key={roadtrip.id}
              className={classNames({
                [styles.roadtripPanel]: fullWidth,
                [styles.roadtripPanelMobile]: !fullWidth,
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
