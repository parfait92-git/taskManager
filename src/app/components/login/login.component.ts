import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  @Output() eventVal: EventEmitter<number> = new EventEmitter<number>();
  @Output() eventLoader: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() accountCreated: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private authSvc: AuthService,
    private router: Router,
    private tokenSvc: TokenService
  ) {}

  ngOnInit() {
    this.createForm();
    console.log(this.accountCreated)
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      const userData: User = this.userForm.value;
      this.activateLoader(true);
      this.authSvc
        .login({ username: userData.username, password: userData.password })
        .subscribe((res) => {
          setTimeout(() => this.activateLoader(false), 2000);
          console.log(JSON.stringify(res));
          this.router.navigate(['home/',res.id]);
        });
        setTimeout(() => this.activateLoader(false), 2000);
    }
  }

  goToRegister() {
    this.eventVal.emit(2)
  }

  activateLoader(val: boolean) {
    this.eventLoader.emit(val)
  }
}
