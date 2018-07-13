import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/service.index';
import { UsuarioSafe } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    public _login: LoginService
  ) { }

  ngOnInit() {
  }
  
}
