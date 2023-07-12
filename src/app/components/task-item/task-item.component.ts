import { Component, EventEmitter, Input, NgZone, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Task } from 'src/app/shared/models/task';
import { TaskService } from 'src/app/shared/services/task.service';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RefreshService } from 'src/app/shared/services/refresh.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Input() uid!: string;
  @Output() getNewTaskList: EventEmitter<Task[]> = new EventEmitter<Task[]>();
  @Input() modalRef: BsModalRef | null = null
  @Input() myModalTemplate!: TemplateRef<any>
  @Output() taskEmit: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private taskSvc: TaskService
    , private modalService: BsModalService,
    private nZone: NgZone,
    private refresh: RefreshService
    ) {
    this.task = new Task();
  }
  ngOnInit(): void {
  }
  deleteTask() {
    if( this.task.id)
    this.taskSvc.deleteTask(this.uid, this.task.id).subscribe((res) => {
      this.nZone.run(async() => await this.onTaskAdded())
      console.log({userId: this.uid, taskId: this.task.id, res: res})
    })
  }

  formatDate(date: any): string {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  async onTaskAdded() {
    this.taskSvc.listTasks(this.uid).subscribe((result) => {
        this.getNewTaskList.emit(result);
    })
  }

  editTask(template: any, task: Task) {
    if(this.modalRef) {
      this.modalRef = this.modalService.show(template); // Ouvrir la modal
      this.refresh.setNewData('edit');
      this.taskEmit.emit(task);
    }
  }


}
