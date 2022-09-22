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

  improvementNoConfig(request: ImprovementRequest): Observable<void> {
    return this.http.post<void>('http://localhost:8082/improvement/no-config', request);
  }

  improvementWithConfig(request: ImprovementRequest): Observable<void> {
    return this.http.post<void>('http://localhost:8082/improvement/with-config', request);
  }

  improvementWithConfigAndPattern(request: ImprovementRequest, pattern: PatternTemplateNumber): Observable<void> {
    console.log(request);
    pattern.improvementRequest = request;
    return this.http.post<void>('http://localhost:8082/improvement/with-config-and-pattern', pattern);
  }

  getConfig(): Observable<Map<String, Object>> {
    return this.http.get<Map<String, Object>>('http://localhost:8082/improvement/get-config');
  }

  getImprovementResults(): Observable<ImprovementResultsRequest[]> {
    return this.http.get<ImprovementResultsRequest[]> ('http://localhost:8081/improvement/get-improvement-results');
  }
}
