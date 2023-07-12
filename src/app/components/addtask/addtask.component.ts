import { AfterViewInit, Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Task } from 'src/app/shared/models/task';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddtaskComponent implements OnInit , AfterViewInit{

  taskForm!: FormGroup;
  modalRef: BsModalRef | null = null;
  @Input() uid!: string;
  @Output() getNewTaskList: EventEmitter<Task[]> = new EventEmitter<Task[]>();
  task: Task;
  @Input() taskId: string = '';
  constructor(private formBuilder: FormBuilder,
    private zone: NgZone,
     private taskSvc: TaskService) {
    this.task = new Task();

   }

   ngAfterViewInit(): void {

   }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      realized: [false, Validators.required],
      priorities: this.formBuilder.array([])
    });

  }


  initializeForm() {
    const defaultVal: Partial<Task> = {name: this.task.name, description: this.task.description};
    this.taskForm.patchValue(defaultVal);
  }

  addTask() {
    if (this.taskForm.valid) {
      const taskData: Task = this.taskForm.value;
      this.taskSvc.addTask(this.uid, taskData).subscribe(async (res) => {
      this.zone.run(async () =>await this.onTaskAdded() )
       await  this.taskForm.reset();
       if(res)
        this.modalRef?.hide();
        console.log(res);
      })
    } else {
      console.log('Formulaire invalide');
    }
  }

  closeModal() {
    this.modalRef?.hide();
  }



  async onTaskAdded() {
    this.taskSvc.listTasks(this.uid).subscribe((result) => {
        this.getNewTaskList.emit(result);
    })
  }

  get priorities(): FormArray {
    return this.taskForm.get('priorities') as FormArray;
  }

  addPriority() {
    const priorityGroup = this.formBuilder.group({
      color: [''],
      name: [''],
      description: ['']
    });

    this.priorities.push(priorityGroup);
  }

}
