import { Injectable } from '@angular/core';
import { API_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { CategoriaGasto } from '../../models/categoria-gasto.model';

@Injectable()
export class CategoriaGastoService {

  url: string = API_URL + '/CategoriasGasto';

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

  public save(categoria_gasto: CategoriaGasto) {
    return this.http.post(this.url, categoria_gasto);
  }

  // Se usa para validar el modelo. Es mas seguro.
  public update(categoria_gasto: CategoriaGasto) {
    return this.http.put(this.url + '/' + categoria_gasto.id, categoria_gasto);
  }

  // Actualiza algunos atributos sin importar las validaciones required del modelo.
  public updateAttributes(categoria_gasto: CategoriaGasto) {
    return this.http.patch(this.url + '/' + categoria_gasto.id, categoria_gasto);
  }

  public delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
