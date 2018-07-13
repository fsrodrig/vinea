import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
// Modulos
import {
  ComponentsModule
} from '../components/components.module';
import {
  SharedModule
} from '../shared/shared.module';
import {
  SharedCommonsModule
} from '../shared/shared-commons.module';

// Rutas
import {
  PAGES_ROUTES
} from './pages.routes';

// NgCharts
import { ChartsModule } from 'ng2-charts';


// Componentes
import {
  PagesComponent,
  DashboardComponent,
  AccountSettingsComponent,
  UsuarioComponent,
  UsuarioCrearComponent,
  UsuarioViewComponent,
  IngresoComponent,
  IngresoCrearComponent,
  IngresoViewComponent,
  EgresoComponent,
  EgresoCrearComponent,
  EgresoViewComponent,
  OperadorComponent,
  OperadorCrearComponent,
  OperadorViewComponent
} from './pages.index';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    UsuarioComponent,
    UsuarioCrearComponent,
    UsuarioViewComponent,
    IngresoComponent,
    IngresoCrearComponent,
    IngresoViewComponent,
    EgresoComponent,
    EgresoCrearComponent,
    EgresoViewComponent,
    OperadorComponent,
    OperadorCrearComponent,
    OperadorViewComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    SharedCommonsModule,
    PAGES_ROUTES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    ChartsModule
  ]
})
export class PagesModule {}
