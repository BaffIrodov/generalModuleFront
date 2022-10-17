export class MatchesRequest {
  id: number;
  matchesUrl: String;
  leftTeam: String;
  rightTeam: String;
  matchFormat: String;
  matchDate: String;
  matchMapsNames: String[];
  leftTeamOdds: String;
  rightTeamOdds: String;
  matchTime: number;
  mapsPredict: Map<String, String> = new Map<String, String>();
  mapsPredictChanged: String[];
}
