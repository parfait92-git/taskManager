import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/shared/models/task';
import { User } from 'src/app/shared/models/user';
import { TaskService } from 'src/app/shared/services/task.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  userId: string = '';
  isOpen: boolean = false;
  taskList: Task[];
  task!: Task;
  @ViewChild('myModalTemplate') myModalTemplate?: TemplateRef<any>;
  constructor(private route: ActivatedRoute,
    private taskSvc: TaskService,
    private userSvc: UserService) {
    this.user = new User();
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userid') as string;
    });
    this.taskList = new Array<Task>();
  }

  ngOnInit(): void {

  }


  getNewTasks(val: any) {
    this.taskList = val
  }

  getSelectedTask(task: any) {
    this.task = task
  }


}
