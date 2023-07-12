import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RefreshService } from './refresh.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends GenericService<any>{
  url: string;
  constructor(http: HttpClient, tokenSvc: TokenService) {
    super(http, tokenSvc);
    this.url = 'http://localhost:3001/api/users'
  }

  addTask(userId: string, data: Task): Observable<Task> {
    const api = `${this.url}/${userId}/tasks`
    return new Observable<Task>((observer) => {
      this.create(api, data).subscribe((result: any)=> {
        const task: Task = new Task();
        task.loadFromJSON(result.data);
        observer.next(task);
        observer.complete();
      }, err => {
        observer.error(err);
        observer.complete();
      });
    })
  };

  listTasks(userId: string, limit?: number): Observable<Task[]> {
    let api = limit? `${this.url}/${userId}/tasks?limit=${limit}` : `${this.url}/${userId}/tasks`;
    return this.getAll(api).pipe(
      map((result: any) => {
        const tasks: Task[] = new Array<Task>();
        for(const jsonTask of result.data) {
          const task = new Task();
          task.loadFromJSON(jsonTask);
          tasks.push(task);
        }
        return tasks;
      }), catchError((err: any) => {
        return throwError(err);
      })
    )
  }

  getTasksById(taskId: string): Observable<Task> {
    let api = `${this.url}/tasks/${taskId}`;
    return new Observable<Task>((observer) => {
      this.getById(api).subscribe((result) => {
        let task: Task = new Task();
        task.loadFromJSON(result.data);
        observer.next(task);
        observer.complete();
      }, err => {
        observer.error(err);
        observer.complete();
      })
    });
  }

  updateTask(userId: string, data: Task): Observable<any> {
    let api = `${this.url}/${userId}/tasks/${data.id}`
    return this.update(api,data);
  }

  deleteTask(userId: string, taskId: string) : Observable<any> {
    let api = `${this.url}/${userId}/tasks/${taskId}`;
    return this.delete(api);
  }

}
