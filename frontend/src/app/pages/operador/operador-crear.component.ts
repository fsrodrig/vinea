import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  Operador
} from '../../models/operador.model';
import {
  OperadorService
} from '../../services/service.index';
import { cuitValidator } from '../../directives/cuit-validator.directive';

@Component({
  selector: 'app-operador-crear',
  templateUrl: './operador-crear.component.html'
})
export class OperadorCrearComponent implements OnInit {

  forma: FormGroup;
  operador: Operador;

  isSaving = false

  constructor(
    public _operador: OperadorService
  ) {}

  ngOnInit() {
    this.forma = new FormGroup({
      nombre  : new FormControl(null, Validators.required),
      cuit    : new FormControl(null, [Validators.required, cuitValidator]),
    });
  }

  save() {
    if (this.forma.valid) {
      this.isSaving = true;
      this._operador.save(
          new Operador(
            null,
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
