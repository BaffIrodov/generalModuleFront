import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor() { }

  mapComponentToTotal = new Map<String, Number>();
  mapComponentToAvailable = new Map<String, Number>();
  mapComponentToLoading = new Map<String, Boolean>();
  mapComponentToStartTime = new Map<String, Number>;
}
