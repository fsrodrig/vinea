import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  DatePipe
} from '@angular/common';
import {
  IngresoService,
  EgresoService,
  CategoriaGastoService
} from '../../services/service.index';
import {
  Ingreso
} from '../../models/ingreso.model';
import {
  Egreso
} from '../../models/egreso.model';

import {
  isNullOrUndefined
} from 'util';
import { BaseChartDirective } from 'ng2-charts';
import { CategoriaGasto } from '../../models/categoria-gasto.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  ingresos: Ingreso[];
  egresos: Egreso[];
  gastos: Egreso[];

  tenencias: Tenencia[];
  date_tenencia: string;

  // Declaro las variables que van a llevar la cuenta de gastos
  tot = [0,0,0,0,0,0,0,0,0,0,0,0]

  // Doughnut

  pieTitle: string = '';

  @ViewChild('pieChart') pieChart: BaseChartDirective;

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartColors = [
    {
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ba2364', '#36efab', '#c1549e', '#ff6e32']
    }
  ];
  public doughnutChartType: string = 'doughnut';
  
  // BarChart
  
  @ViewChild('barChart') barChart: BaseChartDirective;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales : {
      yAxes: [{
         ticks: {
            beginAtZero: true
          }
      }] 
    }
  };
  public barChartLabels: string[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;
  public barChartData: any[] = [{
    data: [0],
    label: "Gastos 2018"
  }];

  constructor(
    public _ingreso: IngresoService,
    public _egreso: EgresoService,
    public _categoriaGasto: CategoriaGastoService,
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
    this.generarGraficos();
  }

  public calcular() {
    // Inicializo los totales en 0
    this.tenencias.forEach((t) => t.total = 0);

    let ingresos = this.ingresos;
    let egresos = this.egresos;
    // Filtro a la última fecha seleccionada.
    if (this.date_tenencia !== null) {
      ingresos = this.ingresos.filter((i) => (new Date(i.fecha)).getTime() <= (new Date(this.date_tenencia)).getTime());
      egresos = this.egresos.filter((e) => (new Date(e.fecha)).getTime() <= (new Date(this.date_tenencia)).getTime());
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

  public generarGraficos() {
    let meses = new Set();
    this.gastos = this.egresos.filter((e) => !isNullOrUndefined(e.categoria_gasto_id));
    // Asigno los gastos a cada mes. (no toma los años diferentes!)
    this.gastos.forEach((g) => {
      let fecha = new Date(g.fecha);
      switch (fecha.getMonth()) {
        case 0:
          this.tot[0] += g.monto;
          meses.add(`Ene ${fecha.getFullYear()}`)
          break;
        case 1:
          this.tot[1] += g.monto;
          meses.add(`Feb ${fecha.getFullYear()}`)
          break;
        case 2:
          this.tot[2] += g.monto;
          meses.add(`Mar ${fecha.getFullYear()}`)
          break;
        case 3:
          this.tot[3] += g.monto;
          meses.add(`Abr ${fecha.getFullYear()}`)
          break;
        case 4:
          this.tot[4] += g.monto;
          meses.add(`May ${fecha.getFullYear()}`)
          break;
        case 5:
          this.tot[5] += g.monto;
          meses.add(`Jun ${fecha.getFullYear()}`)
          break;
        case 6:
          this.tot[6] += g.monto;
          meses.add(`Jul ${fecha.getFullYear()}`)
          break;
        case 7:
          this.tot[7] += g.monto;
          meses.add(`Ago ${fecha.getFullYear()}`)
          break;
        case 8:
          this.tot[8] += g.monto;
          meses.add(`Sep ${fecha.getFullYear()}`)
          break;
        case 9:
          this.tot[9] += g.monto;
          meses.add(`Oc ${fecha.getFullYear()}`)
          break;
        case 10:
          this.tot[10] += g.monto;
          meses.add(`Nov ${fecha.getFullYear()}`)
          break;
        case 11:
          this.tot[11] += g.monto;
          meses.add(`Dic ${fecha.getFullYear()}`)
          break;
      }
    });
    // Tomo los ultimos 6 meses
    // if (meses.size > 6) {
    //   for (let i = meses.size - 6; i < meses.size; i++) {
    //     this.barChartLabels.push(meses[i]);
    //   }
    // } else {
    //   meses.forEach((m) => this.barChartLabels.push(m));
    // }
    // this.barChartLabels.reverse(); // Hago esto porque sino los ultimos meses los va agregando al principio
    this.barChartData[0].data.pop();
    this.tot
      // .filter((t) => t > 0)
      .forEach((t) => this.barChartData[0].data.push(t));
    this.barChart.chart.update();  // Actualizo el gráfico con las nuevas labels.
    
    // Elijo el último mes para generar el pie.
    let last: number;
    for (let i = 0; i < this.tot.length; i++) {
      if (this.tot[i] > 0) last = i;
    }
    this.generarPie(last);
  }

  // events
  public barChartClicked(e: any): void {
    console.log(e);
    ;
    this.generarPie(e.active[0]._index);
  }

  private generarPie(mes: number) {
    this.doughnutChartLabels.length = 0;
    this.doughnutChartData.length = 0;
    this.pieTitle = (new Date(2018, mes, 2, 0, 0, 0, 0)).toLocaleDateString('es', {year: 'numeric', month: 'short'});
    let gMes: Egreso[] = this.gastos.filter((g) => (new Date(g.fecha)).getMonth() === mes);
    this._categoriaGasto.findAll().subscribe( (catGastos: CategoriaGasto[]) => {
      catGastos.forEach((cG) => {
        let total = 0;
        this.doughnutChartLabels.push(cG.nombre);
        gMes.filter((g: Egreso) => g.categoria_gasto_id === cG.id)
            .forEach((g: Egreso) => total += g.monto);
            this.doughnutChartData.push(total);
      });
      this.pieChart.chart.update();
    });
  }

}

interface Tenencia {
  nombre: string,
    badge: string,
    texto: string,
    icono: string,
    total: number
}
