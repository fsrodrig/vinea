import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '../../config/config';
import { Usuario } from '../../models/usuario.model';

@Injectable()
export class UsuarioService {

  url: string = API_URL + '/Usuarios';

  constructor(
    public http: HttpClient
  ) {}

  public findAll() {
    return this.http.get(this.url);
  }

  public getCount() {
    return this.http.get(this.url + '/count');
  }

  public find(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  public save(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }

  // Se usa para validar el modelo. Es mas seguro.
  public update(usuario: Usuario) {
    return this.http.put(this.url + '/' + usuario.id, usuario);
  }

  // Actualiza algunos atributos sin importar las validaciones required del modelo.
  public updateAttributes(usuario: Usuario) {
    return this.http.patch(this.url + '/' + usuario.id, usuario);
  }

  public delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  public changePassword(oldP: string, newP: string): any {
    let params = `oldPassword=${oldP}&newPassword=${newP}`
    return this.http.post(this.url + '/change-password', params, { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
  }

}
