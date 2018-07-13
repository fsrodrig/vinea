import { Injectable } from '@angular/core';
import { API_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { FormaDePago } from '../../models/forma-de-pago.model';

@Injectable()
export class FormaDePagoService {

  url: string = API_URL + '/FormasDePago';

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

  public save(forma_de_pago: FormaDePago) {
    return this.http.post(this.url, forma_de_pago);
  }

  // Se usa para validar el modelo. Es mas seguro.
  public update(forma_de_pago: FormaDePago) {
    return this.http.put(this.url + '/' + forma_de_pago.id, forma_de_pago);
  }

  // Actualiza algunos atributos sin importar las validaciones required del modelo.
  public updateAttributes(forma_de_pago: FormaDePago) {
    return this.http.patch(this.url + '/' + forma_de_pago.id, forma_de_pago);
  }

  public delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
