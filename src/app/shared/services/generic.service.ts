import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { RefreshService } from './refresh.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> extends RefreshService {
  token!: string | null;
  headerPost!: HttpHeaders;
  headerGet!: HttpHeaders;
  constructor(private http: HttpClient, private tokenSv: TokenService) {
    super();
    this.tokenSv.getToken().subscribe((jwt) => {
      this.token = jwt;
      this.headerGet = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });
      this.headerPost =  new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    })
  }

  create(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data, {headers: this.headerPost});
  }

  getAll(url: string): Observable<T> {
    return this.http.get<T>(url, {headers: this.headerPost})
  }

  getById(url: string): Observable<T> {
    return this.http.get<T>(`${url}`, {headers: this.headerGet})
  };

  update(url: string, data: T): Observable<T> {
    return this.http.put<T>(url, data, {headers: this.headerPost});
  };

  delete(url: string): Observable<T> {
      return this.http.delete<T>(`${url}`, {headers: this.headerPost});
  }

}
