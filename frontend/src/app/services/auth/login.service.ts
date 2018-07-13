import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../config/config';
import { UsuarioMin, UsuarioLogin } from '../../models/usuario.model';
import { AccessToken } from '../../models/accessToken.model';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  url: string = API_URL + '/Usuarios';

  usuario: UsuarioMin;
  token: AccessToken;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.loadSession();
  }

  public login(usuario: UsuarioLogin, recordarme: boolean = false): any {

    if (recordarme) {
      localStorage.setItem('username', usuario.username);
    } else {
      localStorage.removeItem('username');
    }

    return this.http.post(this.url + '/login?include=user', usuario)
      .map((res: any) => {
        this.usuario = res.user;
        this.token = new AccessToken(res.id, res.ttl, null, res.created);
        this.saveSession(this.token, res.user);
        return true
      });
  }

  public logout() {
    this.http.post(this.url + '/logout',{})
      .subscribe( () => {
        this.usuario = null;
        this.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
      });
      this.router.navigate(['/login']);
  }

  private saveSession(token, user) {
    localStorage.setItem('usuario', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
  }

  private loadSession() {
    if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'));
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = null;
      this.usuario = null;
    }
  }

  public isAuthenticated(): boolean {

    if (this.token !== null && this.token.id.length === 64 && this.token.created) {
      let creado = new Date(this.token.created);
      let hoy = new Date();
      // paso las fechas a segundo.
      let creado_seg = creado.getTime() / 1000;
      let hoy_seg = hoy.getTime() / 1000;
      // ver como renovar el token despues de cierto tiempo. Duracion actual 15 días.
      if ((hoy_seg - creado_seg) <= this.token.ttl) { // valido que el token siga siendo válido
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }
}
