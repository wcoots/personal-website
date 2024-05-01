export interface GeoLocationAPIResponse {
  location: { longitude: number; latitude: number; principalSubdivision: string };
}

export enum Status {
  SCHEDULED = 'SCHEDULED',
  TIMED = 'TIMED',
  IN_PLAY = 'IN_PLAY',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
  SUSPENDED = 'SUSPENDED',
  POSTPONED = 'POSTPONED',
  CANCELLED = 'CANCELLED',
  AWARDED = 'AWARDED',
}

export enum Winner {
  HOME_TEAM = 'HOME_TEAM',
  AWAY_TEAM = 'AWAY_TEAM',
  DRAW = 'DRAW',
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface Score {
  home: number | null;
  away: number | null;
}

export interface Match {
  id: number;
  utcDate: Date;
  status: Status;
  homeTeam: Team;
  awayTeam: Team;
  score: { winner: Winner | null; halfTime: Score; fullTime: Score };
}

export interface Weather {
  name: string;
  weather: { icon: string; description: string }[];
  main: { temp: number };
  sys: { sunrise: number; sunset: number };
}

export interface MoonPhase {
  phase: string;
  emoji: string;
}
