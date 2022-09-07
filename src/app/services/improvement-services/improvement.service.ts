import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MapsCalculatingQueueResponse} from "../../domain/calculating-domain/MapsCalculatingQueueResponse";
import {ImprovementRequest} from "../../domain/improvement-domain/improvementRequest";

@Injectable({
  providedIn: 'root'
})
export class ImprovementService {

  constructor(private http: HttpClient) { }

  simpleImprovement(request: ImprovementRequest): Observable<void> {
    return this.http.post<void>('http://localhost:8081/calculating/improvement', request);
  }
}
