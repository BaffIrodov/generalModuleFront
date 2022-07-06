import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const url = 'http://localhost:8080/results/';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) { }

  writeResultsLinks(pageNumber: number): Observable<Number> {
    return this.http.post<Number>(url + 'write-links', pageNumber);
  }
}
