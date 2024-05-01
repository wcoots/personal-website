export const dynamic = 'force-dynamic';

export async function GET() {
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);

  const json = await response.json();

  return new Response(JSON.stringify(json));
}
