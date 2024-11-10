import { Point, Feature, GeoJsonProperties } from 'geojson';

export function isMobile(windowWidth?: number) {
  return (windowWidth ?? window.innerWidth) <= 750;
}

export function isPointFeature(feature: unknown): feature is Feature<Point, GeoJsonProperties> {
  return (
    typeof feature === 'object' &&
    feature !== null &&
    (feature as Feature).type === 'Feature' &&
    (feature as Feature).geometry?.type === 'Point'
  );
}
