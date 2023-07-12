import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  @Output() eventVal: EventEmitter<number> = new EventEmitter<number>();
  @Output() eventLoader: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accountCreatedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private authSvc: AuthService,
    private router: Router,
    private tokenSvc: TokenService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  submitForm() {
    if (this.userForm.valid) {
      const userData: User = this.userForm.value;
      console.log({data: userData});
      this.activateLoader(true)
      this.userSvc.addUser(userData).subscribe((res) => {
        this.userCreated(true);
        console.log(JSON.stringify(res));
        this.activateLoader(false);
              this.gotToLogin();
      });
      setTimeout(() => this.activateLoader(false), 2000);
      // Utilisez les données utilisateur pour votre logique
    }
  }

  gotToLogin() {
    this.eventVal.emit(1);
  }

  activateLoader(val: boolean) {
    this.eventLoader.emit(val)
  }

  userCreated(val: boolean) {
    this.accountCreatedEvent.emit(val);
  }
}
