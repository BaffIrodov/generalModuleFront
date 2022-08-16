import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Errors} from "../../domain/common-domain/errors";

const url = 'http://localhost:8080/errors/';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private http: HttpClient) { }

  getAllErrors(): Observable<Errors[]>{
    return this.http.get<Errors[]>(url + 'search-all');
  }

  getArchiveErrors(): Observable<Errors[]>{
    return this.http.get<Errors[]>(url + 'search-archive');
  }

  getNotArchiveErrors(): Observable<Errors[]>{
    return this.http.get<Errors[]>(url + 'search-not-verified');
  }

  setSelectedRowsProcessed(errors: Errors[]): Observable<void>{
    return this.http.post<void>(url + 'set-processed', errors);
  }
}
