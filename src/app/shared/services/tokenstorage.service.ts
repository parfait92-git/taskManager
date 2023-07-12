import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenstorageService {
  tokenKey: string;
  constructor() {
    this.tokenKey = 'token'
   }

  takeToken(): string| null {
    return sessionStorage.getItem(this.tokenKey);
  }

  storeToken(val: string) {
    sessionStorage.setItem(this.tokenKey, val);
  }

  clearToken() {
    sessionStorage.removeItem(this.tokenKey);
  }

}
