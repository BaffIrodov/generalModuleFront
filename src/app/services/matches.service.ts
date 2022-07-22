import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatchesRequest} from "../domain/matchesRequest";
import {MatchesFullRequest} from "../domain/matchesFullRequest";

const url = 'http://localhost:8080/matches/';

@Injectable({
  providedIn: 'root'
})

export class MatchesService {

  constructor(private http: HttpClient) { }

  writeMatchesLinks(): Observable<MatchesFullRequest>{
    return this.http.post<MatchesFullRequest>(url + 'write-links', null);
  }
}
