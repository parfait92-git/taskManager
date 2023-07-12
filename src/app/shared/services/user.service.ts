import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { User } from '../models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { TokenstorageService } from './tokenstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<any> {
  url: string;
  headers!: HttpHeaders;
  constructor(http: HttpClient,private tokenSvc: TokenService, private httpClient: HttpClient, private tokenMgr: TokenstorageService) {
    super(http, tokenSvc);
    this.url = 'http://localhost:3001/api/users'; 
    this.headers =  new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }


  addUser(data: User): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/register`, data, {headers: this.headers});
  };

  listUsers(id: string, limit: number): Observable<User[]> {
    let api = `${this.url}/${id}`
    let provideUrl = limit? `${api}/getAll?limit=${limit}`: `${api}/getAll`;
    return new Observable<User[]>((observer) => {
      this.getAll(provideUrl).subscribe((result: any) => {
        const users: User[] = [];
        for(const jsonUsers of result.data) {
          const user = new User();
          user.loadFromJSON(jsonUsers);
          users.push(user);
        }
        observer.next(users);
        observer.complete();
      }, err => {
        observer.error(err);
        observer.complete();
      });
    })
  }

  getUserById(id: string): Observable<User> {
    let api = `${this.url}/${id}`;
    let token = this.tokenMgr.takeToken();
    return new Observable<User>((observer) => {
      this.getById(api).subscribe((result) => {
        console.log('le status est '+result.data);
        let user = new User();
        let data = result.data as User;
        user.loadFromJSON(data);
        observer.next(user);
        observer.complete();
      }, (err: HttpErrorResponse) => {
        if ((err.status != 500 && token) || (err.status === null && token)) {
          console.log('le status est '+err.status);
          this.tokenSvc.removeToken();
        }
        observer.error(err);
        observer.complete();
      })
    });
  }


  updateUser(id: string, data: User): Observable<any> {
    let api = `${this.url}/update/${id}`
    return this.update(api,data);
  }

  logOut(id: string): Observable<any> {
    let api = `${this.url}/logout/${id}`;
    return this.httpClient.put<any>(api, {headers: this.headerPost});
  }

}
