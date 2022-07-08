import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const url = 'http://localhost:8080/matches/';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) { }
}
