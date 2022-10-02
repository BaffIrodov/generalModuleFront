import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const url = 'http://localhost:8080/debug/';

@Injectable({
  providedIn: 'root'
})
export class DebugService {

  constructor(private http: HttpClient) { }

  resultsLinkSetProcessed(value: boolean): Observable<Number> {
    return this.http.get<Number>(url + `results-link-processed/${value}`);
  }

  filesWithDistribution() {
    return this.http.get<void>(`http://localhost:8081/debug/files-distribution`);
  }

  mapsBalance() {
    return this.http.get<void>(`http://localhost:8082/debug/maps-balance`);
  }
}
