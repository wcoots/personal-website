import { NextResponse } from 'next/server';
import { db } from '@/app/api/kysely';
import { TrigTable as TrigPoint } from '@/postgres-schema';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse<TrigPoint[]>> {
  const trigPoints = await db
    .selectFrom('database.trig')
    .select([
      'id',
      'name',
      'latitude',
      'longitude',
      'historic_use',
      'current_use',
      'condition',
      'country',
      'height_feet',
      'height_metres',
      'national_park',
      'aonb',
    ])
    .execute();

  return NextResponse.json(trigPoints);
}
