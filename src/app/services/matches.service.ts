import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const url = 'http://localhost:8080/matches/';

@Injectable({
  providedIn: 'root'
})

export class MatchesService {

  constructor(private http: HttpClient) { }

  writeMatchesLinks(): Observable<Array<String>>{
    return this.http.post<Array<String>>(url + 'write-links', Array<String>);
  }
  /*writeMatchesLinks(): Observable<Array<{id: number, link: String}>>{
    return this.http.post<Array<{id: number, link: String}>>(url + 'write-links', Array<{id: number, link: String}>);
  }*/
}
