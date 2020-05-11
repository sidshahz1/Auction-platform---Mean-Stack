import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userservice: UserService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      if(!this.userservice.isloggedin()){
        this.router.navigateByUrl('/login');
        this.userservice.deletetoken();
        return false;
      }
    return true;
  }
  
}
