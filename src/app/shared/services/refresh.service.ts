import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private _object: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }

  setNewData(data: any): void {
    this._object.next(data);
  }

  getNewData(): Observable<any> {
    return this._object.asObservable();
  }
}
