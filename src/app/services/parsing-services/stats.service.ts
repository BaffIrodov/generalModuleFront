import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StatsResponse} from "../../domain/parsing-domain/statsResponse";
import {StatsRequest} from "../../domain/parsing-domain/statsRequest";

const url = 'http://localhost:8080/stats/';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getAvailableCountForParsing(): Observable<Number> {
    return this.http.get<Number>(url + 'available-count');
  }

  getTotalCountForParsing(): Observable<Number> {
    return this.http.get<Number>(url + 'total-count');
  }

  getResponseAnalytics(): Observable<StatsResponse[]> {
    return this.http.get<StatsResponse[]>(url + 'response-analytics');
  }

  writeStatsPlayers(request: StatsRequest): Observable<StatsResponse> {
    return this.http.post<StatsResponse>(url + 'write-players', request);
  }
}
