import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MapsCalculatingQueueResponse} from "../../domain/calculating-domain/MapsCalculatingQueueResponse";
import {ImprovementRequest} from "../../domain/improvement-domain/improvementRequest";
import {PatternTemplateNumber} from "../../domain/improvement-domain/patternTemplateNumber";
import {ImprovementResultsRequest} from "../../domain/improvement-domain/improvementResultsRequest";

const url = 'http://localhost:8082/improvement/';

@Injectable({
  providedIn: 'root'
})
export class ImprovementService {

  constructor(private http: HttpClient) { }

  improvementInactivePercent(request: ImprovementRequest): Observable<void> {
    return this.http.post<void>(url + 'inactive-percent', request);
  }

  improvementNoConfig(request: ImprovementRequest): Observable<void> {
    return this.http.post<void>(url + 'no-config', request);
  }

  improvementShuffling(request: ImprovementRequest): Observable<void> {
    return this.http.post<void>(url + 'shuffling', request);
  }

  improvementConsensus(request: ImprovementRequest): Observable<void> {
    return this.http.post<void>(url + 'consensus', request);
  }

  improvementWithConfig(request: ImprovementRequest): Observable<void> {
    return this.http.post<void>(url + 'with-config', request);
  }

  improvementWithConfigAndPattern(request: ImprovementRequest, pattern: PatternTemplateNumber): Observable<void> {
    console.log(request);
    pattern.improvementRequest = request;
    return this.http.post<void>(url + 'with-config-and-pattern', pattern);
  }

  getConfig(): Observable<Map<String, Object>> {
    return this.http.get<Map<String, Object>>(url + 'get-config');
  }

  getImprovementResults(): Observable<ImprovementResultsRequest[]> {
    return this.http.get<ImprovementResultsRequest[]> ('http://localhost:8081/improvement/get-improvement-results');
  }
}
