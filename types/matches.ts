export interface TimeLeftToStart {
  seconds: number;
}

export interface Match {
  id: number;
  slug: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamLogoUrl: string;
  awayTeamLogoUrl: string;
  championshipName: string;
  homeScore: number;
  awayScore: number;
  matchStatusName: string;
  startAt: string;
  timeLeftToStart: TimeLeftToStart;
  tvChannelName: string;
  tvChannelId: number;
}

export interface MatchesData {
  [championshipName: string]: Match[];
}

export interface MatchesState {
  data: MatchesData;
}
