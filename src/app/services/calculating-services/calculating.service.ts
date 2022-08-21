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

  createPlayerForceTable(): Observable<void> {
    console.log("Начало создания playerForce таблицы")
    return this.http.get<void>(url + 'create-player-force-table');
  }

  createQueue(): Observable<MapsCalculatingQueueResponse> {
    return this.http.get<MapsCalculatingQueueResponse>(url + 'create-queue');
  }

  calculatePlayersForces(): Observable<void> {
    return this.http.get<void>(url + 'calculate-forces');
  }

  debug(): Observable<void> {
    return this.http.get<void>(url + 'debug');
  }

  resetPlayersForces(): Observable<void> {
    return this.http.get<void>(url + 'reset-players-forces');
  }
}
