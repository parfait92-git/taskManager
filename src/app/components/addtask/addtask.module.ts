import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddtaskComponent } from './addtask.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: '',
//     component: AddtaskComponent
//   }
// ];

@NgModule({
  declarations: [
    // AddtaskComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ]
})
export class AddtaskModule { }
