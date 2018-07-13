import { Injectable } from '@angular/core';
import { API_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Vendedor } from '../../models/vendedor.model';

@Injectable()
export class VendedorService {

  url: string = API_URL + '/Vendedores';

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

  public save(vendedor: Vendedor) {
    return this.http.post(this.url, vendedor);
  }

  // Se usa para validar el modelo. Es mas seguro.
  public update(vendedor: Vendedor) {
    return this.http.put(this.url + '/' + vendedor.id, vendedor);
  }

  // Actualiza algunos atributos sin importar las validaciones required del modelo.
  public updateAttributes(vendedor: Vendedor) {
    return this.http.patch(this.url + '/' + vendedor.id, vendedor);
  }

  public delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
