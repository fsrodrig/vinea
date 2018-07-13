import { Component, OnInit } from '@angular/core';
import { Columna } from '../../components/components.index';
import { EgresoService } from '../../services/service.index';
import { Egreso } from '../../models/egreso.model';
import { DatePipe } from '@angular/common';
import { CurrencyFormatPipe } from '../../pipes/pipes.index';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.component.html'
})
export class EgresoComponent implements OnInit {

  data     : any;
  datos    : any[];

  constructor(
    public _egreso: EgresoService,
    public datePipe: DatePipe,
    public currecyPipe: CurrencyFormatPipe
  ) {}

  ngOnInit() {
    this._egreso.findAll().subscribe(
      (res: any) => this.onSuccess(res), 
      (err) => this.onError(err)
    );
  }

  private onError( res: any ) {
    console.log(res);
    this.datos = []
  }

  private onSuccess(res: Egreso[]) {
    this.datos = [];
    res.forEach( (egreso) => {
      this.datos.push({
        id: egreso.id,
        fecha: this.datePipe.transform(egreso.fecha.split('T')[0], 'dd/MM/yyyy'),
        concepto: egreso.concepto.nombre,
        descripcion: egreso.descripcion,
        operador: isNullOrUndefined(egreso.operador) ? '': egreso.operador.nombre,
        nro_res: egreso.nro_res,
        forma_de_pago: egreso.forma_de_pago.nombre,
        cambio: this.currecyPipe.transform(egreso.cambio),
        monto: this.currecyPipe.transform(egreso.monto)
      })
    });
    this.data = {
      nombre      : 'egreso',
      nombrePlural: 'egresos',
      url         : 'egreso',
      datos       : this.datos,
      columnas    : [
        { atributo: 'fecha', nombre: 'Fecha' },
        { atributo: 'concepto', nombre: 'Concepto' },
        { atributo: 'descripcion', nombre: 'Descripción' },
        { atributo: 'operador', nombre: 'Operador' },
        { atributo: 'nro_res', nombre: 'Nº RES' },
        { atributo: 'forma_de_pago', nombre: 'Forma de Pago' },
        { atributo: 'cambio', nombre: 'Tasa Cambio' },
        { atributo: 'monto', nombre: 'Monto' }
      ]
    }
  }

}
