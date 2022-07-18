import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatchesRequest} from "../domain/matchesRequest";

const url = 'http://localhost:8080/matches/';

@Injectable({
  providedIn: 'root'
})

export class MatchesService {

  constructor(private http: HttpClient) { }

  writeMatchesLinks(): Observable<MatchesRequest[]>{
    return this.http.post<MatchesRequest[]>(url + 'write-links', null);
  }
}
