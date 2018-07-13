import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/pages/usuario.service';
import { Columna } from '../../components/components.index';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  data    : any;
  
  constructor(
    private _usuario: UsuarioService,
  ) {}

  ngOnInit() {
    this._usuario.findAll().subscribe(
      (res: any) => this.onSuccess(res), 
      (err) => this.onError(err)
    );
  }

  private onSuccess( res: Usuario[] ) {
    this.data = {
        nombre      : 'usuario',
        nombrePlural: 'usuarios',
        url         : 'usuario',
        datos       : res,
        columnas    : [
          { atributo: 'nombre', nombre: 'Nombre' },
          { atributo: 'apellido', nombre: 'Apellido' },
          { atributo: 'username', nombre: 'Usuario' },
          { atributo: 'email', nombre: 'Correo' },
          { atributo: 'legajo', nombre: 'Núm Legajo' },
          { atributo: 'fecha_baja', nombre: 'Estado', tipo: 'estado' },
        ]
    }
  }

  private onError( res: any ) {
    console.log(res);
    this.data = []
  }

}