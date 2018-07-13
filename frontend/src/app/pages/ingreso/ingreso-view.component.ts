import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ingreso } from '../../models/ingreso.model';
import { Concepto } from '../../models/concepto.model';
import { FormaDePago } from '../../models/forma-de-pago.model';
import { Vendedor } from '../../models/vendedor.model';
import { IngresoService, ConceptoService, FormaDePagoService, VendedorService } from '../../services/service.index';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ingreso-view',
  templateUrl: './ingreso-view.component.html'
})
export class IngresoViewComponent implements OnInit {

  forma: FormGroup = new FormGroup({});
  ingreso: Ingreso = new Ingreso();

  conceptos     : Concepto[]    = [];
  formas_de_pago: FormaDePago[] = [];
  vendedores    : Vendedor[]    = [];

  isSaving = false;
  isEdit = false;

  constructor(
    public _ingreso: IngresoService,
    public _concepto: ConceptoService,
    public _forma_de_pago: FormaDePagoService,
    public _vendedor: VendedorService,
    public datePipe: DatePipe,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe( (params) => {
      this._ingreso.find(params.id)
                   .subscribe((res) => {
                     this.ingreso = res;
                     this.ingreso.fecha = (this.ingreso.fecha) ? this.datePipe.transform(this.ingreso.fecha.split('T')[0], 'yyyy-MM-dd'): null;
                     this.forma = new FormGroup({
                       fecha            : new FormControl(this.ingreso.fecha, Validators.required),
                       concepto_id      : new FormControl(this.ingreso.concepto_id, Validators.required),
                       vendedor_id      : new FormControl(this.ingreso.vendedor_id),
                       nro_res          : new FormControl(this.ingreso.nro_res, [Validators.min(5000), Validators.max(9999)]),
                       pasajero         : new FormControl(this.ingreso.pasajero),
                       recibo           : new FormControl(this.ingreso.recibo, Validators.maxLength(12)),
                       descripcion      : new FormControl(this.ingreso.descripcion),
                       forma_de_pago_id : new FormControl(this.ingreso.forma_de_pago_id, Validators.required),
                       cambio           : new FormControl(this.ingreso.cambio, [Validators.required, Validators.min(1), Validators.max(100)]),
                       monto            : new FormControl(this.ingreso.monto, [Validators.required, Validators.min(0)]),
                     });
                   });
    
    });
  }

  toEdit() {
    this.isEdit = true;
    this._concepto.findAll().subscribe((res: Concepto[]) => this.conceptos = res);
    this._forma_de_pago.findAll().subscribe((res: FormaDePago[]) => this.formas_de_pago = res);
    this._vendedor.findAll().subscribe((res: Vendedor[]) => this.vendedores = res);
  }

  save() {
    if (this.forma.valid) {
      this.isSaving = true;
      this._ingreso.update(
          new Ingreso(
            this.ingreso.id,
            this.forma.value.fecha,
            this.forma.value.descripcion,
            this.forma.value.pasajero,
            this.forma.value.nro_res,
            this.forma.value.recibo,
            this.forma.value.cambio,
            this.forma.value.monto,
            this.forma.value.concepto_id,
            this.forma.value.forma_de_pago_id,
            this.forma.value.vendedor_id
          )
        )
        .subscribe(
          () => {
            swal('Felicitaciones!', 'Ingreso guardado con éxito', 'success')
              .then(() => {
                this.goBack();
              });
          },
          (err) => {
            this.isSaving = false;
            swal('Error!', err.error.error.message, 'error');
          }
        )
    }
  }

  clean() {
    if (this.forma.value.concepto_id !== '1') {
      this.forma.controls.pasajero.setValue(null)
      this.forma.controls.nro_res.setValue(null)
      this.forma.controls.recibo.setValue(null)
      this.forma.controls.vendedor_id.setValue(null)
      this.forma.controls['pasajero'].clearValidators();
      this.forma.controls['pasajero'].updateValueAndValidity();
      this.forma.controls['recibo'].clearValidators();
      this.forma.controls['recibo'].updateValueAndValidity();
      this.forma.controls['vendedor_id'].clearValidators();
      this.forma.controls['vendedor_id'].updateValueAndValidity();
  
    }
  }

  goBack() {
    window.history.back();
  }

}
