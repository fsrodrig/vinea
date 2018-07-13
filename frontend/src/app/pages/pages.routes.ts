import { Routes, RouterModule } from '@angular/router';
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
import { LoginGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },

            // USUARIOS
            { path: 'usuario', component: UsuarioComponent, data: { titulo: 'Usuarios' } },
            { path: 'usuario/new', component: UsuarioCrearComponent, data: { titulo: 'Usuarios', subtitulo: 'Nuevo usuario' } },
            { path: 'usuario/view/:id', component: UsuarioViewComponent, data: { titulo: 'Usuarios', subtitulo: 'Ver usuario' } },
            // INGRESO
            { path: 'ingreso', component: IngresoComponent, data: { titulo: 'Ingresos' } },
            { path: 'ingreso/new', component: IngresoCrearComponent, data: { titulo: 'Ingresos', subtitulo: 'Nuevo ingreso' } },
            { path: 'ingreso/view/:id', component: IngresoViewComponent, data: { titulo: 'Ingresos', subtitulo: 'Ver ingreso' } },    
            // EGRESO
            { path: 'egreso', component: EgresoComponent, data: { titulo: 'Egresos' } },
            { path: 'egreso/new', component: EgresoCrearComponent, data: { titulo: 'Egresos', subtitulo: 'Nuevo egreso' } },
            { path: 'egreso/view/:id', component: EgresoViewComponent, data: { titulo: 'Egresos', subtitulo: 'Ver egreso' } },

            // OPERADOR
            { path: 'operador', component: OperadorComponent, data: { titulo: 'Operadores' } },
            { path: 'operador/new', component: OperadorCrearComponent, data: { titulo: 'Operadores', subtitulo: 'Nuevo operador' } },
            { path: 'operador/view/:id', component: OperadorViewComponent, data: { titulo: 'Operadores', subtitulo: 'Ver operador' } },

            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Cuenta' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
     }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
