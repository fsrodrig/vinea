import { Component, OnInit } from '@angular/core';
import { Columna } from '../../components/components.index';
import { IngresoService } from '../../services/service.index';
import { Ingreso } from '../../models/ingreso.model';
import { DatePipe } from '@angular/common';
import { CurrencyFormatPipe } from '../../pipes/currencyFormat.pipe';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html'
})
export class IngresoComponent implements OnInit {

  data  : any
  datos : any[];

  constructor(
    public _ingreso: IngresoService,
    public datePipe: DatePipe,
    public currecyPipe: CurrencyFormatPipe
  ) { }

  ngOnInit() {
    this._ingreso.findAll().subscribe(
      (res: any) => this.onSuccess(res), 
      (err) => this.onError(err)
    );
  }

  private onError( res: any ) {
    console.log(res);
    this.datos = [];
  }

  private onSuccess(res: Ingreso[]) {
    this.datos = [];
    res.forEach( (ingreso) => {
      this.datos.push({
        id: ingreso.id,
        fecha: this.datePipe.transform(ingreso.fecha.split('T')[0], 'dd/MM/yyyy'),
        concepto: ingreso.concepto.nombre,
        descripcion: ingreso.descripcion,
        vendedor: isNullOrUndefined(ingreso.vendedor) ? '' : ingreso.vendedor.nombre,
        nro_res: ingreso.nro_res,
        pasajero: ingreso.pasajero,
        recibo: ingreso.recibo,
        forma_de_pago: ingreso.forma_de_pago.nombre,
        cambio: this.currecyPipe.transform(ingreso.cambio),
        monto: this.currecyPipe.transform(ingreso.monto)
      })
    });
    this.data = {
      nombre      : 'ingreso',
      nombrePlural: 'ingresos',
      url         : 'ingreso',
      datos       : this.datos,
      columnas    : [
        { atributo: 'fecha', nombre: 'Fecha' },
        { atributo: 'concepto', nombre: 'Concepto' },
        { atributo: 'descripcion', nombre: 'Descripción' },
        { atributo: 'nro_res', nombre: 'Nº RES' },
        { atributo: 'recibo', nombre: 'Recibo' },
        { atributo: 'forma_de_pago', nombre: 'Forma de Pago' },
        { atributo: 'cambio', nombre: 'Tasa Cambio' },
        { atributo: 'monto', nombre: 'Monto' }
      ]
    }
  }

}
