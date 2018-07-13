import { Component, OnInit } from '@angular/core';
import { IngresoService, EgresoService } from '../../services/service.index';
import { Ingreso } from '../../models/ingreso.model';
import { Egreso } from '../../models/egreso.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    ingresos: Ingreso[];
    egresos: Egreso[];

    tenencias: Tenencia[];

    constructor(
        public _ingreso: IngresoService,
        public _egreso: EgresoService
    ) { 
        this.tenencias = [
            {
                nombre: 'Pesos',
                badge: 'bg-inverse',
                texto: 'text-inverse',
                icono: 'ti-wallet',
                total: 0
            },
            {
                nombre: 'Dólares',
                badge: 'bg-success',
                texto: 'text-success',
                icono: 'fa fa-money',
                total: 0
            },
            {
                nombre: 'Banco',
                badge: 'bg-danger',
                texto: 'text-danger',
                icono: 'fa fa-university',
                total: 0
            },
            {
                nombre: 'Mercado Pago',
                badge: 'bg-info',
                texto: 'text-info',
                icono: 'fa fa-credit-card',
                total: 0
            },
            {
                nombre: 'Cheques',
                badge: 'bg-secondary',
                texto: 'text-secondary',
                icono: 'fa fa-list-alt',
                total: 0
            },
            {
                nombre: 'Euros',
                badge: 'bg-primary',
                texto: 'text-primary',
                icono: 'fa fa-euro',
                total: 0
            },

        ]
    }

    ngOnInit() {
        this._ingreso.findAll().subscribe( (res: Ingreso[]) => this.onSuccessIn(res) );
    }
    
    private onSuccessIn(res: Ingreso[]) {
        this.ingresos = res;
        this._egreso.findAll().subscribe( (res: Egreso[]) => this.onSuccessOut(res) );
    }

    private onSuccessOut(res: Egreso[]) {
        this.egresos = res;
        this.calcular();
    }

    private calcular() {
        // Pesos
        this.ingresos.filter( (ingreso) => ingreso.forma_de_pago_id === 1 )
                    .forEach( (ingreso) => this.tenencias[0].total += ingreso.monto );
        this.egresos.filter( (egreso) => egreso.forma_de_pago_id === 1 )
                    .forEach( (egreso) => this.tenencias[0].total -= egreso.monto );
        // Dolares
        this.ingresos.filter( (ingreso) => ingreso.forma_de_pago_id === 2 )
                    .forEach( (ingreso) => this.tenencias[1].total += ingreso.monto );
        this.egresos.filter( (egreso) => egreso.forma_de_pago_id === 2 )
                    .forEach( (egreso) => this.tenencias[1].total -= egreso.monto );
        // Tarjeta
        this.ingresos.filter( (ingreso) => ingreso.forma_de_pago_id === 7 )
                    .forEach( (ingreso) => this.tenencias[3].total += ingreso.monto );
        this.egresos.filter( (egreso) => egreso.forma_de_pago_id === 7 )
                    .forEach( (egreso) => this.tenencias[3].total -= egreso.monto );
        // Cheque
        this.ingresos.filter( (ingreso) => ingreso.forma_de_pago_id === 4 )
                    .forEach( (ingreso) => this.tenencias[4].total += ingreso.monto );
        this.egresos.filter( (egreso) => egreso.forma_de_pago_id === 4 )
                    .forEach( (egreso) => this.tenencias[4].total -= egreso.monto );
        // Euro
        this.ingresos.filter( (ingreso) => ingreso.forma_de_pago_id === 3 )
                    .forEach( (ingreso) => this.tenencias[5].total += ingreso.monto );
        this.egresos.filter( (egreso) => egreso.forma_de_pago_id === 3 )
                    .forEach( (egreso) => this.tenencias[5].total -= egreso.monto );
        // Banco
        this.ingresos.filter( (ingreso) => ingreso.forma_de_pago_id === 5 )
                    .forEach( (ingreso) => this.tenencias[2].total += ingreso.monto );
        this.egresos.filter( (egreso) => egreso.forma_de_pago_id === 5 )
                    .forEach( (egreso) => this.tenencias[2].total -= egreso.monto );
        this.ingresos.filter( (ingreso) => ingreso.forma_de_pago_id === 6 )
                    .forEach( (ingreso) => this.tenencias[2].total += ingreso.monto );
        this.egresos.filter( (egreso) => egreso.forma_de_pago_id === 6 )
                    .forEach( (egreso) => this.tenencias[2].total -= egreso.monto );
    }

}

interface Tenencia {
    nombre: string,
    badge: string,
    texto: string,
    icono: string,
    total: number
}
