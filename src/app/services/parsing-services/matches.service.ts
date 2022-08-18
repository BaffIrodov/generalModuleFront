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
    return this.http.post<MatchesFullRequest>(url + 'write-links', null);
  }

  getTotalMatchesCountForParsing(): Observable<Number>{
    return this.http.get<Number>(url + 'total-matches-count');
  }

  getProcessedMatchesCount(): Observable<Number>{
    return this.http.get<Number>(url + 'processed-matches-count');
  }
}
