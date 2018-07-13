import { Injectable } from '@angular/core';
import { Egreso } from '../../models/egreso.model';
import { API_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EgresoService {

  url: string = API_URL + '/Egresos';

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

  public save(egreso: Egreso) {
    return this.http.post(this.url, egreso);
  }

  // Se usa para validar el modelo. Es mas seguro.
  public update(egreso: Egreso) {
    return this.http.put(this.url + '/' + egreso.id, egreso);
  }

  // Actualiza algunos atributos sin importar las validaciones required del modelo.
  public updateAttributes(egreso: Egreso) {
    return this.http.patch(this.url + '/' + egreso.id, egreso);
  }

  public delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
