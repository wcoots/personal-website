import { useState } from 'react';
import { Match, Status } from '@/types';

export function useFootball() {
  const [fixtures, setFixtures] = useState<Match[] | null>(null);

  async function getFixtures() {
    const response = await fetch('/api/football', { next: { revalidate: 6 } });
    const { matches }: { matches: Match[] } = await response.json();
    const [mostRecentMatch, secondMostRecentMatch, thirdMostRecentMatch, fourthMostRecentMatch] = matches
      .filter((match) => match.status === Status.FINISHED)
      .reverse();
    const [nextMatch, subsequentMatch] = matches.filter((match) =>
      [Status.SCHEDULED, Status.TIMED].includes(match.status),
    );
    const currentMatch = matches.find((match) => [Status.IN_PLAY, Status.PAUSED].includes(match.status));

    if (currentMatch) {
      setFixtures([secondMostRecentMatch, mostRecentMatch, currentMatch, nextMatch]);
    } else if (nextMatch && subsequentMatch) {
      setFixtures([secondMostRecentMatch, mostRecentMatch, nextMatch, subsequentMatch]);
    } else if (nextMatch) {
      setFixtures([thirdMostRecentMatch, secondMostRecentMatch, mostRecentMatch, nextMatch]);
    } else {
      setFixtures([fourthMostRecentMatch, thirdMostRecentMatch, secondMostRecentMatch, mostRecentMatch]);
    }
  }

  return { fixtures, getFixtures };
}
