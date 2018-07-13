import { Component, OnInit } from '@angular/core';
import { Egreso } from '../../models/egreso.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Concepto } from '../../models/concepto.model';
import { FormaDePago } from '../../models/forma-de-pago.model';
import { Operador } from '../../models/operador.model';
import { EgresoService, ConceptoService, FormaDePagoService, OperadorService, CategoriaGastoService } from '../../services/service.index';
import { DatePipe } from '@angular/common';
import { CategoriaGasto } from '../../models/categoria-gasto.model';

@Component({
  selector: 'app-egreso-crear',
  templateUrl: './egreso-crear.component.html'
})
export class EgresoCrearComponent implements OnInit {

  
  forma: FormGroup;
  egreso: Egreso;

  conceptos        : Concepto[]        = [];
  formas_de_pago   : FormaDePago[]     = [];
  operadores       : Operador[]        = [];
  categorias_gasto : CategoriaGasto[]  = [];

  isSaving = false;

  constructor(
    public _egreso: EgresoService,
    public _concepto: ConceptoService,
    public _forma_de_pago: FormaDePagoService,
    public _operador: OperadorService,
    public _categoria_gasto: CategoriaGastoService,
    public datePipe: DatePipe
  ) {}

  ngOnInit() {

    this._concepto.findAll().subscribe((res: Concepto[]) => this.conceptos = res);
    this._forma_de_pago.findAll().subscribe((res: FormaDePago[]) => this.formas_de_pago = res);
    this._operador.findAll().subscribe((res: Operador[]) => this.operadores = res);
    this._categoria_gasto.findAll().subscribe((res: CategoriaGasto[]) => this.categorias_gasto = res);
    this.forma = new FormGroup({
      fecha              : new FormControl( this.datePipe.transform(Date.now(), 'yyyy-MM-dd'), Validators.required),
      concepto_id        : new FormControl(null, Validators.required),
      operador_id        : new FormControl(null),
      nro_res            : new FormControl(null, [Validators.min(5000), Validators.max(9999)]),
      categoria_gasto_id : new FormControl(null),
      descripcion        : new FormControl(null),
      forma_de_pago_id   : new FormControl(null, Validators.required),
      cambio             : new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
      monto              : new FormControl(null, [Validators.required, Validators.min(0)]),
    });
  }

  save() {
    if (this.forma.valid) {
      this.isSaving = true;
      this._egreso.save(
          new Egreso(
            null,
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
