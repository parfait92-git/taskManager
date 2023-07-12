import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3001/api/users';
  token!: string | null;
  headers!: HttpHeaders;
  headersAuth!:HttpHeaders;
   private _isAuth: BehaviorSubject<{isAuth: boolean, uid?: string}> = new BehaviorSubject<{isAuth: boolean, uid?: string}>({isAuth: false, uid: ''});
  constructor(private http: HttpClient, private tokenSvc: TokenService) {
    this.tokenSvc.getToken().subscribe((jwt) => {
      this.token = jwt;
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      this.headersAuth =  new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    })
   }

  login(data: {username?: string, password?: string}): Observable<User> {
    return new Observable<User>((observer) => {
      let api: string = `${this.url}/login`
      this.http.post<any>(api, data, {headers: this.headers})
      .subscribe((result) => {
          let user = new User();
          let isauth: boolean = result.auth;
          user.loadFromJSON(result.data);
          this._isAuth.next({isAuth: isauth, uid: user?.id });
          this.tokenSvc.setToken(result.token);
          observer.next(user);
          observer.complete();
      })
    });
  }

  userIsAuth(): Observable<{isAuth: boolean, uid?: string}> {
    return this._isAuth.asObservable();
  }

  getNewTokenIfUserIsAuth(uid?: string, token?: string) : Observable<{token: string, uid: string}> {
    let api = `${this.url}/${uid}/token/${token}`
    return new Observable<{token: string, uid: string}>((observer) => {
      this.http.get<any>(api, {headers: this.headersAuth}).subscribe((result) => {
        const data = result.data;
        const obj = {token: data.token, uid: data.userId};
        observer.next(obj);
        observer.complete();
      }, (err) => {
        observer.error(err);
        observer.complete();
      })
    });
  }
}
