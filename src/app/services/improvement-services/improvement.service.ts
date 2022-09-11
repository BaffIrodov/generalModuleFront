import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MapsCalculatingQueueResponse} from "../../domain/calculating-domain/MapsCalculatingQueueResponse";
import {ImprovementRequest} from "../../domain/improvement-domain/improvementRequest";

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
    console.log(request);
    return this.http.post<void>('http://localhost:8082/improvement/with-config', request);
  }

  getConfig(): Observable<Map<String, Object>> {
    return this.http.get<Map<String, Object>>('http://localhost:8082/improvement/get-config');
  }
}
