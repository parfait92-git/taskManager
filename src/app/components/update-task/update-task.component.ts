import { AfterViewInit, Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Task } from 'src/app/shared/models/task';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TaskService } from 'src/app/shared/services/task.service';


@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnChanges, OnInit{
  taskForm!: FormGroup;
  modalRef: BsModalRef | null = null;
  @Input() uid!: string;
  @Input() task!:Task;

  @Output() getNewTaskList: EventEmitter<Task[]> = new EventEmitter<Task[]>();
  constructor(private formBuilder: FormBuilder,
    private zone: NgZone,
     private taskSvc: TaskService) {

   }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnChanges(): void {
    console.log(JSON.stringify(this.task))
    if(this.task) {
      this.taskForm.patchValue({
      name: this.task.name,
      description: this.task.description
      })
    }
  }

  closeModal() {
    this.modalRef?.hide();
  }

  updateTask(taskId?: string) {
    if (this.taskForm.valid && taskId) {
      const taskData: Task = this.taskForm.value;
      this.taskSvc.updateTask(taskId, taskData).subscribe(async (res) => {
       await this.onTaskAdded();
       await  this.taskForm.reset();
        this.modalRef?.hide();
        console.log(res);
      })
    } else {
      console.log('Formulaire invalide');
    }
  }

  async onTaskAdded() {
    this.taskSvc.listTasks(this.uid).subscribe((result) => {
        this.getNewTaskList.emit(result);
    })
  }

}
