export class MatchesRequest {
  id: number;
  matchesUrl: String;
  leftTeam: String;
  rightTeam: String;
  matchFormat: String;
  matchMapsNames: String[];
  leftTeamOdds: String;
  rightTeamOdds: String;
  matchTime: bigint;
}
