import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/service.index';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { cuitValidator } from '../../directives/cuit-validator.directive';
import { Usuario, UsuarioSafe } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario-view',
  templateUrl: './usuario-view.component.html'
})
export class UsuarioViewComponent implements OnInit {

  usuario: Usuario = new Usuario();

  forma: FormGroup = new FormGroup({});
  passwordForma: FormGroup;
  isSaving = false;
  isEdit = false;
  isDisabled = true;
  clase = 'users';

  constructor(
    private _usuario: UsuarioService,
    private route   : ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this._usuario.find(params.id)
                     .subscribe( (res) => {
                       this.usuario = res; 
                       this.usuario.fecha_nacimiento = this.datePipe.transform(this.usuario.fecha_nacimiento.split('T')[0], 'yyyy-MM-dd');
                       this.usuario.fecha_alta = this.datePipe.transform(this.usuario.fecha_alta.split('T')[0], 'yyyy-MM-dd');
                       this.usuario.fecha_baja = (this.usuario.fecha_baja) ? this.datePipe.transform(this.usuario.fecha_baja.split('T')[0], 'yyyy-MM-dd'): null;
                       this.forma = new FormGroup({
                          nombre            : new FormControl(this.usuario.nombre, Validators.required),
                          apellido          : new FormControl(this.usuario.apellido, Validators.required),
                          username          : new FormControl(this.usuario.username, Validators.required),
                          email             : new FormControl(this.usuario.email, [Validators.required, Validators.email]),
                          dni               : new FormControl(this.usuario.dni, Validators.required),
                          cuil              : new FormControl(this.usuario.cuil, [Validators.required, cuitValidator]),
                          domicilio         : new FormControl(this.usuario.domicilio, Validators.required),
                          telefono          : new FormControl(this.usuario.telefono, Validators.required),
                          legajo            : new FormControl(this.usuario.legajo),
                          foto              : new FormControl({value: this.usuario.foto, disabled: true}),
                          password          : new FormControl({value: '****', disabled: true}, Validators.required), // Revisar como hacer el change password, porque viene null por defecto.
                          fecha_nacimiento  : new FormControl(this.usuario.fecha_nacimiento, Validators.required),
                          fecha_alta        : new FormControl(this.usuario.fecha_alta),
                          fecha_baja        : new FormControl(this.usuario.fecha_baja)
                        });
                       });
    });
    // Inicializo el form de cambiar pass
    this.cambiarPassword();
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

  toEdit() {
    this.isEdit = true;
  }

  save() {
    if(this.forma.valid) {
      this.isSaving = true;
      this._usuario.updateAttributes(
        new UsuarioSafe(
          this.usuario.id,
          this.forma.value.username,
          this.forma.value.email,
          this.forma.value.nombre,
          this.forma.value.apellido,
          this.forma.value.dni,
          this.forma.value.cuil,
          this.forma.value.domicilio,
          this.forma.value.telefono,
          this.forma.value.fecha_nacimiento,
          this.forma.value.legajo,
          this.forma.value.foto,
          this.usuario.fecha_alta,
          this.usuario.fecha_baja
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

  cambiarPassword() {
    this.passwordForma = new FormGroup({
      oldPassword    : new FormControl(null, Validators.required),
      password       : new FormControl(null, Validators.required),
      password2      : new FormControl(null, Validators.required)
    }, { validators: this.sonIguales('password', 'password2') });
  }

  savePassword() {
    console.log(this.passwordForma);
    if (this.passwordForma.valid) {
      this._usuario.changePassword( this.passwordForma.value.oldPassword, this.passwordForma.value.password)
        .subscribe(
          () => {
            swal('Felicitaciones!', 'Contraseña cambiada con éxito', 'success')
            .then(() => {
                this.forma.controls.password.setValue(this.passwordForma.value.password);
            });
          },
          (err) => { console.log('error guardando usuario', err); }
        )
    }   
  }

}
