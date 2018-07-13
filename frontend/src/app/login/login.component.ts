import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/service.index';
import { UsuarioLogin } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recordarme: boolean = false
  username: string;

  constructor( 
    public router: Router,
    public _login: LoginService  
  ) {  }

  ngOnInit() {
    init_plugins();
    this.username = localStorage.getItem('username') || '';
    if( this.username.length > 1 ) {
      this.recordarme = true;
    }
  }

  ingresar( forma: NgForm ) {
    
    if (forma.invalid) {
      return;
    }

    let usuario = new UsuarioLogin( 
      forma.value.username,
      null,
      forma.value.password
    );

    this._login.login(usuario, forma.value.recordarme).subscribe(
      () => this.router.navigate(['/dashboard']),
      (err) => {
        swal('Error!', 'Usuario/Contraseña incorrectos', 'error');        
        console.log(err)
      }
    );  
  }

}
