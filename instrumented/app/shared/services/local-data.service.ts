import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor() { }

  getConfiguredLang(): string | null{
    return localStorage.getItem('language');
  }
}
