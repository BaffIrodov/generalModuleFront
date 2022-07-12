import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const url = 'http://localhost:8080/matches/';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) { }

  writeMatchesLinks(): Observable<Number>{
    return this.http.post<Number>(url + 'write-links', Number);
  }
}
