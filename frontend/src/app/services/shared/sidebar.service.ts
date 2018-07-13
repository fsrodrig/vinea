import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard'},
        { titulo: 'Ingresos', url: '/ingreso'},
        { titulo: 'Egresos', url: '/egreso'}
      ]
    },
    {
      titulo: 'Configuración',
      icono: 'mdi mdi-settings',
      submenu: [
        { titulo: 'Operadores', url: '/operador'},
        { titulo: 'Usuarios', url: '/usuario'},
        { titulo: 'Ajustes de Cuenta', url: '/account-settings'}
      ]
    }
  ];

  constructor() { }

}
