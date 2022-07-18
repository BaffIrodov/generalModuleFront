import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const url = 'http://localhost:8080/stats/';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getAvailableCountForParsing(): Observable<Number> {
    return this.http.get<Number>(url + 'available-count');
  }

  writeStatsPlayers(): Observable<Number> {
    return this.http.get<Number>(url + 'write-players');
  }
}
