import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public _login: LoginService,
               public router: Router ) {}

  canActivate(): boolean {
    if (this._login.isAuthenticated()) {
      return true;
    } else {
      console.log('Bloqueado por guard','Implementar página de Unauthorized!');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
