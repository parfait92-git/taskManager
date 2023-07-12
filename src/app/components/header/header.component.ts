import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userId!: string;
  user: User;
  constructor(private router: Router, private tokenSvc: TokenService, private userSv: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
    console.log({id: this.userId});
    this.userSv.getUserById(this.userId).subscribe((res) => {
      console.log('la response est '+res)
      if(res?.id) {
        this.user = res;
      }
    })
  }

  gotToProfile() {
    this.router.navigateByUrl('/profile')
  }

  logout(id: string) {
    this.userSv.logOut(id).subscribe(() => {
      this.tokenSvc.removeToken();
      this.router.navigateByUrl('auth');
    });
  }
}
