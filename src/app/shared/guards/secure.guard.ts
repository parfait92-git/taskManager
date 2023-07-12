import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class SecureGuard implements CanActivate {
  token: string = '';
  constructor(
    private tokenSvc: TokenService,
    private router: Router
  ) {
    this.tokenSvc.getToken().subscribe((val) =>{
      if(val) {
        this.token = val;
      }
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.token) {
        this.router.navigateByUrl('/')
        return true
      }
    return false;
  }

}
