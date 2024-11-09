import { GeneratedAlways } from 'kysely';
import { Point } from 'geojson';

export interface RoadtripsTable {
  id: GeneratedAlways<number>;
  name: string;
  description: string;
}

export interface RoadtripPositionsTable {
  id: GeneratedAlways<number>;
  roadtrip_id: number;
  position: Point;
  elevation: number;
  timestamp: string; // date
}

export interface RoadtripImages {
  id: GeneratedAlways<number>;
  roadtrip_id: number;
  uuid: string;
  position: Point;
  description: string;
  orientation: 'landscape' | 'portrait';
}

export interface Database {
  'database.roadtrips': RoadtripsTable;
  'database.roadtrip_positions': RoadtripPositionsTable;
  'database.roadtrip_images': RoadtripImages;
}
