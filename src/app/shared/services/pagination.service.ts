import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private totalItems: number;
  private currentPage: number;
  private pageSize: number;

  constructor(private taskSvc: TaskService) {
    this.totalItems = 0;
    this.currentPage = 1;
    this.pageSize = 5;
   }

   setTotalItems(total: number): void {
    this.totalItems = total;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize
  }

  getPageSize(): number {
    return this.pageSize;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getTaskItems(userId: string): Observable<Task[]> {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    return this.taskSvc.listTasks(userId, this.pageSize).pipe(
      map((tasks: Task[]) => {
        return tasks.slice(startIndex, endIndex);
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }


}
