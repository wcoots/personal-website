export const dynamic = 'force-dynamic';

const lat = 51.38;
const lon = -2.36;

export async function GET() {
  const response = await fetch(`https://moon-phase.p.rapidapi.com/advanced?lat=${lat}&lon=${lon}`, {
    headers: {
      'X-RapidAPI-Key': process.env.MOON_PHASE_API_KEY!,
      'X-RapidAPI-Host': 'moon-phase.p.rapidapi.com',
    },
  });

  const json = await response.json();

  return new Response(JSON.stringify(json));
}
