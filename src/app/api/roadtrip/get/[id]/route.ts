import { NextRequest, NextResponse } from 'next/server';
import { LngLat } from 'mapbox-gl';
import { Point } from 'geojson';
import { sql } from 'kysely';

import { db } from '@/app/api/kysely';
import { Locale } from '@/types';

export async function GET(_: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const id = parseInt(params.id);

  const roadtripData = await db
    .selectFrom('database.roadtrip_positions as positions')
    .select((eb) => [
      'positions.roadtrip_id',
      'positions.elevation',
      sql`${eb.fn('ST_AsGeoJSON', [eb.ref('position')])}::json`.$castTo<Point>().as('position'),
    ])
    .where('positions.roadtrip_id', '=', id)
    .orderBy('positions.timestamp asc')
    .execute();

  const locales: Locale[] = roadtripData.map((position) => ({
    position: new LngLat(position.position.coordinates[0], position.position.coordinates[1]),
    elevation: position.elevation,
  }));

  return NextResponse.json(locales);
}
