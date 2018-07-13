import {
  Component,
  OnInit
} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  IngresoService,
  EgresoService
} from '../../services/service.index';
import {
  Ingreso
} from '../../models/ingreso.model';
import {
    Egreso
} from '../../models/egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  ingresos: Ingreso[];
  egresos: Egreso[];

  tenencias: Tenencia[];
  date_tenencia: string;

  constructor(
    public _ingreso: IngresoService,
    public _egreso: EgresoService,
    public datePipe: DatePipe
  ) {
    this.tenencias = [{
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
        nombre: 'Euros',
        badge: 'bg-primary',
        texto: 'text-primary',
        icono: 'fa fa-euro',
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
        nombre: 'Cheques',
        badge: 'bg-secondary',
        texto: 'text-secondary',
        icono: 'fa fa-list-alt',
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
        nombre: 'Todo Pago',
        badge: 'bg-warning',
        texto: 'text-warning',
        icono: 'fa fa-credit-card',
        total: 0
      },
    ]
  }

  ngOnInit() {
    this.date_tenencia = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this._ingreso.findAll().subscribe((res: Ingreso[]) => this.onSuccessIn(res));
  }

  private onSuccessIn(res: Ingreso[]) {
    this.ingresos = res;
    this._egreso.findAll().subscribe((res: Egreso[]) => this.onSuccessOut(res));
  }

  private onSuccessOut(res: Egreso[]) {
    this.egresos = res;
    this.calcular();
  }

  private calcular() {
    //Inicializo los totales en 0
    this.tenencias.forEach((t) => t.total = 0);
    
    let ingresos = this.ingresos;
    let egresos = this.egresos;
    // Filtro a la última fecha seleccionada.
    if (this.date_tenencia !== null) {
        ingresos = this.ingresos.filter((i) => {
            const fecha = new Date(i.fecha);
            const elegida = new Date(this.date_tenencia);
            fecha.getTime() <= elegida.getTime()
        });
        console.log('ingresos :', ingresos);
        egresos  = this.egresos.filter((e) => {
            const fecha = new Date(e.fecha);
            const elegida = new Date(this.date_tenencia);
            fecha.getTime() <= elegida.getTime()
        });
    }
    
    // Pesos
    ingresos.filter((ingreso) => ingreso.forma_de_pago_id === 1)
      .forEach((ingreso) => this.tenencias[0].total += ingreso.monto);
    egresos.filter((egreso) => egreso.forma_de_pago_id === 1)
      .forEach((egreso) => this.tenencias[0].total -= egreso.monto);
    // Dolares
    ingresos.filter((ingreso) => ingreso.forma_de_pago_id === 2)
      .forEach((ingreso) => this.tenencias[1].total += ingreso.monto);
    egresos.filter((egreso) => egreso.forma_de_pago_id === 2)
      .forEach((egreso) => this.tenencias[1].total -= egreso.monto);
    // Euro
    ingresos.filter((ingreso) => ingreso.forma_de_pago_id === 3)
      .forEach((ingreso) => this.tenencias[2].total += ingreso.monto);
    egresos.filter((egreso) => egreso.forma_de_pago_id === 3)
      .forEach((egreso) => this.tenencias[2].total -= egreso.monto);
    // Banco
    ingresos.filter((ingreso) => ingreso.forma_de_pago_id === 5)
      .forEach((ingreso) => this.tenencias[3].total += ingreso.monto);
    egresos.filter((egreso) => egreso.forma_de_pago_id === 5)
      .forEach((egreso) => this.tenencias[3].total -= egreso.monto);
    ingresos.filter((ingreso) => ingreso.forma_de_pago_id === 6)
      .forEach((ingreso) => this.tenencias[3].total += ingreso.monto);
    egresos.filter((egreso) => egreso.forma_de_pago_id === 6)
      .forEach((egreso) => this.tenencias[3].total -= egreso.monto);
    // Cheque
    ingresos.filter((ingreso) => ingreso.forma_de_pago_id === 4)
      .forEach((ingreso) => this.tenencias[4].total += ingreso.monto);
    egresos.filter((egreso) => egreso.forma_de_pago_id === 4)
      .forEach((egreso) => this.tenencias[4].total -= egreso.monto);
    // MercadoPago
    ingresos.filter((ingreso) => ingreso.forma_de_pago_id === 7)
      .forEach((ingreso) => this.tenencias[5].total += ingreso.monto);
    this.egresos.filter((egreso) => egreso.forma_de_pago_id === 7)
      .forEach((egreso) => this.tenencias[5].total -= egreso.monto);
    // TodoPago
    ingresos.filter((ingreso) => ingreso.forma_de_pago_id === 8)
      .forEach((ingreso) => this.tenencias[6].total += ingreso.monto);
    egresos.filter((egreso) => egreso.forma_de_pago_id === 8)
      .forEach((egreso) => this.tenencias[6].total -= egreso.monto);

  }

  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';

  // events
  public pieChartClicked(e: any): void {
    console.log(e);
  }

  public pieChartHovered(e: any): void {
    console.log(e);
  }

  // BarChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [{
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Series A'
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Series B'
    }
  ];

  // events
  public barChartClicked(e: any): void {
    console.log(e);
  }

  public barChartHovered(e: any): void {
    console.log(e);
  }

}

interface Tenencia {
  nombre: string,
    badge: string,
    texto: string,
    icono: string,
    total: number
}
