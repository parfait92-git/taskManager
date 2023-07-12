import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token: string;
  constructor(private storageSvc: TokenService, private router: Router) {
    this.token = '';
    this.storageSvc.getToken().subscribe((val) => {
      if(val) {
        this.token = val;
      }
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.token) {
        this.router.navigateByUrl('auth')
        console.log(!!this.token+'1');
        return false;
      }
    return true;
  }

}
