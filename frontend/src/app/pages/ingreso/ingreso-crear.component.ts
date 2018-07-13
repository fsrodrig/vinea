import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Ingreso } from '../../models/ingreso.model';
import { Concepto } from '../../models/concepto.model';
import { FormaDePago } from '../../models/forma-de-pago.model';
import { Vendedor } from '../../models/vendedor.model';
import { IngresoService, ConceptoService, FormaDePagoService, VendedorService } from '../../services/service.index';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ingreso-crear',
  templateUrl: './ingreso-crear.component.html'
})
export class IngresoCrearComponent implements OnInit {

  forma: FormGroup;
  ingreso: Ingreso;

  conceptos     : Concepto[]    = [];
  formas_de_pago: FormaDePago[] = [];
  vendedores    : Vendedor[]    = [];

  isSaving = false;

  constructor(
    public _ingreso: IngresoService,
    public _concepto: ConceptoService,
    public _forma_de_pago: FormaDePagoService,
    public _vendedor: VendedorService,
    public datePipe: DatePipe
  ) {}

  ngOnInit() {

    this._concepto.findAll().subscribe((res: Concepto[]) => this.conceptos = res);
    this._forma_de_pago.findAll().subscribe((res: FormaDePago[]) => this.formas_de_pago = res);
    this._vendedor.findAll().subscribe((res: Vendedor[]) => this.vendedores = res);
    this.forma = new FormGroup({
      fecha            : new FormControl( this.datePipe.transform(Date.now(), 'yyyy-MM-dd'), Validators.required),
      concepto_id      : new FormControl(null, Validators.required),
      vendedor_id      : new FormControl(null),
      nro_res          : new FormControl(null, [Validators.min(5000), Validators.max(9999)]),
      pasajero         : new FormControl(null),
      recibo           : new FormControl(null, Validators.maxLength(12)),
      descripcion      : new FormControl(null),
      forma_de_pago_id : new FormControl(null, Validators.required),
      cambio           : new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
      monto            : new FormControl(null, [Validators.required, Validators.min(0)]),
    });
  }

  save() {
    if (this.forma.valid) {
      this.isSaving = true;
      this._ingreso.save(
          new Ingreso(
            null,
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
      this.forma.controls.pasajero.setValue(null);
      this.forma.controls.nro_res.setValue(null);
      this.forma.controls.recibo.setValue(null);
      this.forma.controls.vendedor_id.setValue(null);
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
