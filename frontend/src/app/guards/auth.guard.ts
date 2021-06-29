 /*import { Injectable } from '@angular/core';
 import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 import { AuthService } from '../services/auth.service';


 @Injectable()
 export class AuthGuard implements CanActivate {

   redirectUrl;

   constructor(private auth: AuthService, private router : Router ) {}

    canActivate(
     router: ActivatedRouteSnapshot,
     state: RouterStateSnapshot
   ): boolean {
     if (!this.auth.isLoggedIn()) {
       this.router.navigate(['/seconnecter']);
       return false;
     }else{
     //this.redirectUrl = state.url;
     return true;
   }
 }
}*/




import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true
    }
    else {
      this.router.navigateByUrl("/seconnecter")
      return false
    }
  }

}
