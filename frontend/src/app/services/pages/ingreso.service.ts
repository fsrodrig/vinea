import { Injectable } from '@angular/core';
import { API_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Ingreso } from '../../models/ingreso.model';

@Injectable()
export class IngresoService {

  url: string = API_URL + '/Ingresos';

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

  public save(ingreso: Ingreso) {
    return this.http.post(this.url, ingreso);
  }

  // Se usa para validar el modelo. Es mas seguro.
  public update(ingreso: Ingreso) {
    return this.http.put(this.url + '/' + ingreso.id, ingreso);
  }

  // Actualiza algunos atributos sin importar las validaciones required del modelo.
  public updateAttributes(ingreso: Ingreso) {
    return this.http.patch(this.url + '/' + ingreso.id, ingreso);
  }

  public delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
