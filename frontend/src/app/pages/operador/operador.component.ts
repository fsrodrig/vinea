import { Component, OnInit } from '@angular/core';
import { Columna } from '../../components/components.index';
import { Operador } from '../../models/operador.model';
import { OperadorService } from '../../services/service.index';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styles: []
})
export class OperadorComponent implements OnInit {

  data     : any;
  
  constructor(
    private _operador: OperadorService,
  ) { }

  ngOnInit() {
    this._operador.findAll().subscribe(
      (res: any) => this.onSuccess(res), 
      (err) => this.onError(err)
    );
  }

  private onSuccess( res: Operador[] ) {
    this.data = {
      nombre      : 'ingreso',
      nombrePlural: 'ingresos',
      url         : 'ingreso',
      datos       : res,
      columnas    : [
      { atributo: 'nombre', nombre: 'Nombre' },
      { atributo: 'cuit', nombre: 'CUIT' },
      { atributo: 'fecha_baja', nombre: 'Estado', tipo: 'estado' }
      ]
    }
  }

  private onError( res: any ) {
    console.log(res);
  }

}
