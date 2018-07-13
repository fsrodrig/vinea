import { Injectable } from '@angular/core';
import { Operador } from '../../models/operador.model';
import { API_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OperadorService {

  url: string = API_URL + '/Operadores';

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

  public save(operador: Operador) {
    return this.http.post(this.url, operador);
  }

  // Se usa para validar el modelo. Es mas seguro.
  public update(operador: Operador) {
    return this.http.put(this.url + '/' + operador.id, operador);
  }

  // Actualiza algunos atributos sin importar las validaciones required del modelo.
  public updateAttributes(operador: Operador) {
    return this.http.patch(this.url + '/' + operador.id, operador);
  }

  public delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
