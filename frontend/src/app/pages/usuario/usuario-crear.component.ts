import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { cuitValidator } from '../../directives/cuit-validator.directive';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html'
})
export class UsuarioCrearComponent implements OnInit {

  forma: FormGroup;
  isSaving = false;

  clase = 'users';

  constructor(
    private _usuario: UsuarioService
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre            : new FormControl(null, Validators.required),
      apellido          : new FormControl(null, Validators.required),
      username          : new FormControl(null, Validators.required),
      email             : new FormControl(null, [Validators.required, Validators.email]),
      dni               : new FormControl(null, Validators.required),
      cuil              : new FormControl(null, [Validators.required, cuitValidator]),
      domicilio         : new FormControl(null, Validators.required),
      telefono          : new FormControl(null, Validators.required),
      // legajo            : new FormControl(null),
      foto              : new FormControl({value: '', disabled: true}),
      password          : new FormControl(null, Validators.required),
      password2         : new FormControl(null, Validators.required),
      fecha_nacimiento  : new FormControl(null, Validators.required),
      // fecha_alta        : new FormControl(null),
      // fecha_baja        : new FormControl(null)
      }, { validators: this.sonIguales('password', 'password2') }
  );
  }

  sonIguales( campo1: string, campo2: string) {
    return(group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    }
  }

  goBack() {
    window.history.back();
  }

  save() {
    if(this.forma.valid) {
      this.isSaving = true;
      console.log(this.forma.value.fecha_nacimiento);
      this._usuario.save(
        new Usuario(
          null,
          this.forma.value.username,
          this.forma.value.email,
          this.forma.value.nombre,
          this.forma.value.apellido,
          this.forma.value.dni,
          this.forma.value.cuil,
          this.forma.value.domicilio,
          this.forma.value.telefono,
          this.forma.value.fecha_nacimiento,
          null,
          this.forma.value.foto,
          null,
          this.forma.value.password
        )
      ).subscribe(
        () => {
          swal('Felicitaciones!', 'Usuario guardado con éxito', 'success')
          .then((value) => {
              if (value) this.goBack();
          });
      },
      (err) => { console.log('error guardando usuario', err); }
      )
    }
  }

  onUpload(archivoUrl: string) {
    this.forma.controls.foto.setValue(archivoUrl);
}

}
