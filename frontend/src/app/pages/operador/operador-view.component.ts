import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Operador } from '../../models/operador.model';
import { OperadorService } from '../../services/service.index';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { cuitValidator } from '../../directives/cuit-validator.directive';

@Component({
  selector: 'app-operador-view',
  templateUrl: './operador-view.component.html'
})
export class OperadorViewComponent implements OnInit {

  forma: FormGroup = new FormGroup({});
  operador: Operador = new Operador();

  isSaving = false;
  isEdit = false;

  constructor(
    public _operador: OperadorService,
    private route   : ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this._operador.find(params.id)
                    .subscribe( (res) => {
                      this.operador = res; 
                      this.operador.fecha_baja = (this.operador.fecha_baja) ? this.datePipe.transform(this.operador.fecha_baja.split('T')[0], 'yyyy-MM-dd'): null;
                      this.forma = new FormGroup({
                        nombre    : new FormControl(this.operador.nombre, Validators.required),
                        cuit      : new FormControl(this.operador.cuit, [Validators.required, cuitValidator]),
                        fecha_baja: new FormControl(this.operador.fecha_baja)
                      });
                    });
    });
  }

  toEdit() {
    this.isEdit = true;
  }

  save() {
    if (this.forma.valid) {
      this._operador.update(
          new Operador(
            this.operador.id,
            this.forma.value.nombre,
            this.forma.value.cuit
          )
        )
        .subscribe(
          () => {
            swal('Felicitaciones!', 'Operador guardado con éxito', 'success')
              .then(() => {
                this.goBack();
              });
          },
          (err) => {
            this.isSaving = false;        
            swal('Error!', err.error.error.message, 'error')
          }
        )
    }
  }

  goBack() {
    window.history.back();
  }

}
