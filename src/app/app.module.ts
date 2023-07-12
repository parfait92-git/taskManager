import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { HomeComponent } from './components/home/home.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { TaskService } from './shared/services/task.service';
import { GenericService } from './shared/services/generic.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddtaskModule } from './components/addtask/addtask.module';
import { ChartArtComponent } from './components/chart-art/chart-art.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UpdateTaskComponent } from './components/update-task/update-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TasksListComponent,
    TaskItemComponent,
    HomeComponent,
    UserprofileComponent,
    HeaderComponent,
    FooterComponent,
    ChartArtComponent,
    AuthentificationComponent,
    LoaderComponent,
    AddtaskComponent,
    UpdateTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ModalModule.forRoot()

  ],
  providers: [
    AuthService,
    UserService,
    TaskService,
    GenericService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
