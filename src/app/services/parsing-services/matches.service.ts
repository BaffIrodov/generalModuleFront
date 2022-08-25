import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatchesRequest} from "../../domain/parsing-domain/matchesRequest";
import {MatchesFullRequest} from "../../domain/parsing-domain/matchesFullRequest";

const url = 'http://localhost:8080/matches/';

@Injectable({
  providedIn: 'root'
})

export class MatchesService {

  constructor(private http: HttpClient) { }

  writeMatchesLinks(): Observable<MatchesFullRequest>{
    return this.http.get<MatchesFullRequest>(url + 'write-links');
  }

  getTotalMatchesCountForParsing(): Observable<String[]>{
    return this.http.get<String[]>(url + 'total-matches-count');
  }

  writeOneMatch(link: String): Observable<MatchesRequest>{
    return this.http.post<MatchesRequest>(url + 'write-one-match', link);
  }
  getProcessedMatchesCount(): Observable<Number>{
    return this.http.get<Number>(url + 'processed-matches-count');
  }

  getMatchesFromDB(): Observable<MatchesRequest[]>{
    return this.http.get<MatchesRequest[]>(url + 'matches-from-db');
  }

  clearAllMatches(): Observable<void> {
    return this.http.get<void>(url + 'clear-all-matches');
  }
}
