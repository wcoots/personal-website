export const dynamic = 'force-dynamic';

const lat = 51.38;
const lon = -2.36;
const unit = 'metric';

export async function GET() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.OPEN_WEATHER_API_KEY}`,
  );

  const json = await response.json();

  return new Response(JSON.stringify(json));
}
