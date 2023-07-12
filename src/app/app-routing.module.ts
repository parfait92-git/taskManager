import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';

const routes: Routes = [
  {
    path: 'home/:userid',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'auth',
    component: AuthentificationComponent
  },
  {
    path: 'tasks',
    component: TasksListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: UserprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'task/add',
    component: AddtaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'task/edit/:id',
    component: AddtaskComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
