import { Point } from 'geojson';

export interface Roadtrip {
  id: number;
  name: string;
  description: string;
}

export interface Locale {
  position: Point;
  elevation: number;
}

export interface Image {
  id: number;
  roadtripId: number;
  url: string;
  position: Point;
  description: string;
  width: number;
}
