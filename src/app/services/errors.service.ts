import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const url = 'http://localhost:8080/errors/';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private http: HttpClient) { }
}
