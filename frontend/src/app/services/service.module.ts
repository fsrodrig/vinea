import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService,
  SidebarService,
  BreadcrumbsService,
  UsuarioService,
  LoginService,
  LoginGuard,
  IngresoService,
  OperadorService,
  EgresoService,
  ConceptoService,
  FormaDePagoService,
  VendedorService,
  CategoriaGastoService
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    BreadcrumbsService,
    UsuarioService,
    LoginService,
    IngresoService,
    EgresoService,
    OperadorService,
    ConceptoService,
    FormaDePagoService,
    VendedorService,
    CategoriaGastoService,
    LoginGuard
    
  ],
  declarations: []
})
export class ServiceModule { }
