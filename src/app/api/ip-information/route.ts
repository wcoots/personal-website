import type { GeoLocationAPIResponse } from '@/types';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ip = new URLSearchParams(searchParams).get('ip');

  if (!ip) return new Response(null, { status: 400 });

  const response = await fetch(
    `https://api.bigdatacloud.net/data/ip-geolocation?key=${process.env.BIG_DATA_CLOUD_API_KEY}&ip=${ip}`,
  );

  const {
    location: { longitude, latitude, principalSubdivision },
  }: GeoLocationAPIResponse = await response.json();

  return new Response(JSON.stringify({ longitude, latitude, principalSubdivision }));
}
