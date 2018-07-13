import { Injectable } from '@angular/core';
import { API_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Concepto } from '../../models/concepto.model';

@Injectable()
export class ConceptoService {

  url: string = API_URL + '/Conceptos';

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

  public save(concepto: Concepto) {
    return this.http.post(this.url, concepto);
  }

  // Se usa para validar el modelo. Es mas seguro.
  public update(concepto: Concepto) {
    return this.http.put(this.url + '/' + concepto.id, concepto);
  }

  // Actualiza algunos atributos sin importar las validaciones required del modelo.
  public updateAttributes(concepto: Concepto) {
    return this.http.patch(this.url + '/' + concepto.id, concepto);
  }

  public delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
