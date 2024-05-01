export const dynamic = 'force-dynamic';

const teamId = 351;

export async function GET() {
  const response = await fetch(`http://api.football-data.org/v4/teams/${teamId}/matches?competitions=2021`, {
    headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY! },
  });

  const json = await response.json();

  return new Response(JSON.stringify(json));
}
