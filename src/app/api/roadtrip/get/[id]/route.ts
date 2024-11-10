import { list } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { Point } from 'geojson';
import { sql } from 'kysely';

import { db } from '@/app/api/kysely';
import { Image, Locale } from '@/types';

export async function GET(_: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const id = parseInt(params.id);

  const [locales, roadtripImages, { blobs }] = await Promise.all([
    db
      .selectFrom('database.roadtrip_positions')
      .select((eb) => [
        'elevation',
        sql`${eb.fn('ST_AsGeoJSON', [eb.ref('position')])}::json`.$castTo<Point>().as('position'),
      ])
      .where('roadtrip_id', '=', id)
      .orderBy('timestamp asc')
      .execute() as Promise<Locale[]>,
    db
      .selectFrom('database.roadtrip_images')
      .select((eb) => [
        'id',
        'roadtrip_id',
        'uuid',
        'description',
        'orientation',
        sql`${eb.fn('ST_AsGeoJSON', [eb.ref('position')])}::json`.$castTo<Point>().as('position'),
      ])
      .where('roadtrip_id', '=', id)
      .execute(),
    list(),
  ]);

  const images: Image[] = roadtripImages
    .map((image) => ({
      id: image.id,
      roadtripId: image.roadtrip_id,
      url: blobs.find((blob) => blob.pathname === image.uuid)?.url!,
      position: image.position,
      description: image.description,
      width: image.orientation === 'landscape' ? 300 : 200,
    }))
    .filter((image) => !!image.url);

  return NextResponse.json({ locales, images });
}
