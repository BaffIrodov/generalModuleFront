import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MapsCalculatingQueueResponse} from "../../domain/calculating-domain/MapsCalculatingQueueResponse";

const url = 'http://localhost:8081/calculating/';

@Injectable({
  providedIn: 'root'
})
export class CalculatingService {

  constructor(private http: HttpClient) { }

  getCurrentQueueSize(): Observable<MapsCalculatingQueueResponse> {
    return this.http.get<MapsCalculatingQueueResponse>(url + 'current-queue-size');
  }

  createQueue(): Observable<MapsCalculatingQueueResponse> {
    return this.http.get<MapsCalculatingQueueResponse>(url + 'create-queue');
  }
}
