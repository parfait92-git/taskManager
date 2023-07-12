import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Task } from 'src/app/shared/models/task';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { RefreshService } from 'src/app/shared/services/refresh.service';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TasksListComponent implements OnInit, AfterViewInit {
  @Input() uid!: string;
  @Input() tasks: Task[];
  modalRef: BsModalRef | null = null
  @Input() myModalTemplate!: TemplateRef<any>
  @Output() taskEmit: EventEmitter<Task> = new EventEmitter<Task>();
  tokenId!: string;
  currentPage: number;

  constructor(private taskSvc: TaskService,
    private zone: NgZone,
    private modalService: BsModalService,
     private refCh: ChangeDetectorRef,
     private passValSvc: RefreshService,
     private paginationSvc: PaginationService
     ) {
    this.tasks = new Array<Task>();
      this.currentPage = this.paginationSvc.getCurrentPage();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.taskSvc.getNewData().subscribe((result) => {
     this.tokenId = result;
    });
    this.zone.run(() => {this.listTask(this.uid);})
    this.refCh.detectChanges();
  }

  listTask(id: string) {
    this.paginationSvc.getTaskItems(id)
    .subscribe((res) => {
      console.log('task list '+res.length)
      if(res.length > 0) {
        this.tasks = res as Task[];
        let pageSize = this.tasks.length;
    this.paginationSvc.setPageSize(4);
    this.paginationSvc.setTotalItems(pageSize);
    console.log('current page ', this.currentPage);
    console.log('number of items ', this.tasks.length);
    console.log('total pages ', this.paginationSvc.getTotalPages());
      }
    })
  }

  getTask(val: any) {
    this.taskEmit.emit(val);
  }


  openModal(template: any) {
    if(this.modalRef) {
      this.modalRef = this.modalService.show(template); // Ouvrir la modal
      this.passValSvc.setNewData('add');
    }
  }

  setCurrentPage(page: number, uid: string) {
    this.currentPage = page;
    this.paginationSvc.setCurrentPage(page);
    this.reloadItems(uid); // Méthode pour recharger les éléments de la page courante
  }

  getNewTask(val: any) {
    this.tasks = val
  }

  reloadItems(uid: string) {
    this.paginationSvc.getTaskItems(uid).subscribe((result) => {
      if(result) {
        this.tasks = result as Task[];
      }
    })
  }

  getTotalPages(): number[] {
    let totalPage = this.paginationSvc.getTotalPages();
    return Array.from({length: totalPage}, (_, index)=> index+1);
  }
}
