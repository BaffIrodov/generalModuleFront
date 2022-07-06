import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const url = 'http://localhost:8080/stats/';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }
}
