import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenstorageService } from './tokenstorage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private _token: BehaviorSubject<string|null> =  new BehaviorSubject<string | null>(null);
  constructor(private tokenSvc: TokenstorageService) {
    const token =  this.tokenSvc.takeToken();
    this._token.next(token);
   }

   getToken(): Observable<string|null> {
    return this._token.asObservable();
   }

   setToken(token: string) {
    this.tokenSvc.storeToken(token);
    this._token.next(token);
   }

   removeToken() {
    this.tokenSvc.clearToken();
    this._token.next(null);
   }
}
