import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Egreso } from '../../models/egreso.model';
import { Concepto } from '../../models/concepto.model';
import { FormaDePago } from '../../models/forma-de-pago.model';
import { Operador } from '../../models/operador.model';
import { EgresoService, ConceptoService, FormaDePagoService, OperadorService, CategoriaGastoService } from '../../services/service.index';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoriaGasto } from '../../models/categoria-gasto.model';

@Component({
  selector: 'app-egreso-view',
  templateUrl: './egreso-view.component.html'
})
export class EgresoViewComponent implements OnInit {


  forma: FormGroup = new FormGroup({});
  egreso: Egreso = new Egreso();

  conceptos     : Concepto[]    = [];
  formas_de_pago: FormaDePago[] = [];
  operadores    : Operador[]    = [];
  categorias_gasto : CategoriaGasto[]  = [];

  isSaving = false;
  isEdit = false;

  constructor(
    public _egreso: EgresoService,
    public _concepto: ConceptoService,
    public _forma_de_pago: FormaDePagoService,
    public _operador: OperadorService,
    public _categoria_gasto: CategoriaGastoService,
    public datePipe: DatePipe,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe( (params) => {
      this._egreso.find(params.id)
                   .subscribe((res) => {
                     this.egreso = res;
                     this.egreso.fecha = (this.egreso.fecha) ? this.datePipe.transform(this.egreso.fecha.split('T')[0], 'yyyy-MM-dd'): null;
                     this.forma = new FormGroup({
                       fecha            : new FormControl(this.egreso.fecha, Validators.required),
                       concepto_id      : new FormControl(this.egreso.concepto_id, Validators.required),
                       operador_id      : new FormControl(this.egreso.operador_id),
                       nro_res          : new FormControl(this.egreso.nro_res, [Validators.min(5000), Validators.max(9999)]),
                       categoria_gasto_id : new FormControl(this.egreso.categoria_gasto_id),
                       descripcion      : new FormControl(this.egreso.descripcion),
                       forma_de_pago_id : new FormControl(this.egreso.forma_de_pago_id, Validators.required),
                       cambio           : new FormControl(this.egreso.cambio, [Validators.required, Validators.min(1), Validators.max(100)]),
                       monto            : new FormControl(this.egreso.monto, [Validators.required, Validators.min(0)]),
                     });
                   });

    });
  }

  toEdit() {
    this.isEdit = true;
    this._concepto.findAll().subscribe((res: Concepto[]) => this.conceptos = res);
    this._forma_de_pago.findAll().subscribe((res: FormaDePago[]) => this.formas_de_pago = res);
    this._operador.findAll().subscribe((res: Operador[]) => this.operadores = res);
    this._categoria_gasto.findAll().subscribe((res: CategoriaGasto[]) => this.categorias_gasto = res);
  }

  save() {
    if (this.forma.valid) {
      this.isSaving = true;
      this._egreso.update(
          new Egreso(
            this.egreso.id,
            this.forma.value.fecha,
            this.forma.value.descripcion,
            this.forma.value.operador_id,
            this.forma.value.nro_res,
            this.forma.value.cambio,
            this.forma.value.monto,
            this.forma.value.concepto_id,
            this.forma.value.forma_de_pago_id,
            this.forma.value.categoria_gasto_id
          )
        )
        .subscribe(
          () => {
            swal('Felicitaciones!', 'Egreso guardado con éxito', 'success')
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
      this.forma.controls.nro_res.setValue(null);
      this.forma.controls['nro_res'].clearValidators();
      this.forma.controls['nro_res'].updateValueAndValidity();
      this.forma.controls.operador_id.setValue(null);
      this.forma.controls['operador_id'].clearValidators();
      this.forma.controls['operador_id'].updateValueAndValidity();
    }
    if (this.forma.value.concepto_id !== '4') {
      this.forma.controls.categoria_gasto_id.setValue(null);
      this.forma.controls['categoria_gasto_id'].clearValidators();
      this.forma.controls['categoria_gasto_id'].updateValueAndValidity();
    }
  }

  goBack() {
    window.history.back();
  }


}
