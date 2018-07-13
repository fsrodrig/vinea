import {
  Component,
  Input,
  OnChanges
} from '@angular/core';
import {
  DatePipe
} from '@angular/common';
import {
  Router
} from '@angular/router';
import swal from 'sweetalert';
import {
  IngresoService,
  EgresoService,
  UsuarioService
} from '../../services/service.index';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnChanges {

  @Input() datos: any = [];

  fil: any = {}
  filtrados: any = [];
  object: any;
  search: string;
  total: number = 0;
  newText: string;
  cargado: string;

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private _ingreso: IngresoService,
    private _egreso: EgresoService,
    private _usuario: UsuarioService
  ) {
    this.object = {
      nombre: '',
      nombrePlural: '',
      url: '',
      columnas: [],
      datos: [],
    }
  }

  ngOnChanges() {
    if (this.datos && this.datos.datos) {
      this.object.nombre = this.datos.nombre;
      this.object.nombrePlural = this.datos.nombrePlural;
      this.object.url = this.datos.url;
      this.object.columnas = this.datos.columnas;
      if (this.datos.datos.length > 0) {
        this.total = this.datos.datos.length;
        this.object.datos = this.datos.datos;
      }
    }
    if ((this.object.nombre.slice(this.object.nombre.length - 1) === 'a')) {
      this.newText = 'Nueva';
      this.cargado = 'cargadas';
    } else {
      this.newText = 'Nuevo';
      this.cargado = 'cargados';
    }
  }

  public create() {
    this.router.navigate([`${this.datos.url}`, 'new']);
  }

  public view(id: number) {
    this.router.navigate([`${this.datos.url}`, 'view', id]);
  }

  private restoreValues(index: number) {
    // saco el elemento de las listas de object y datos 
    this.object.datos.splice(index, 1);
    this.datos.datos = this.object.datos;
  }

  find() {
    this.object.datos = this.filter();
  }

  private filter(): any {
    if (!this.object.datos || !this.search || this.search === '') return this.datos.datos;
    return this.datos.datos.filter((item) => JSON.stringify(item).toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
  }

  public delete(element: any, index: number) {
    switch (this.object.nombre) {
      case 'ingreso':
        swal({
            title: 'Eliminar cliente',
            text: 'Seleccione una opción',
            icon: 'warning',
            dangerMode: true,
            buttons: {
              cancel: {
                text: "Cancelar",
                value: 'cancel',
                visible: true,
                className: "",
                closeModal: true,
              },
              eliminar: {
                text: "Eliminar",
                value: 'eliminar',
                visible: true,
                className: "",
                closeModal: true
              }
            }
          })
          .then((value) => {
            if (value === 'eliminar') {
              this._ingreso.delete(element.id).subscribe(
                (res) => {
                  swal({
                    title: 'Ingreso eliminado con éxito',
                    icon: 'success'
                  });
                  this.restoreValues(index);
                },
                (err) => {
                  console.log('reventó el delete', err);
                }
              );
            }
          });
        break;

      case 'egreso':
        swal({
            title: 'Eliminar Egreso',
            text: 'Seleccione una opción',
            icon: 'warning',
            dangerMode: true,
            buttons: {
              cancel: {
                text: 'Cancelar',
                value: 'cancel',
                visible: true,
                className: '',
                closeModal: true,
              },
              eliminar: {
                text: 'Eliminar',
                value: 'eliminar',
                visible: true,
                className: '',
                closeModal: true
              }
            }
          })
          .then((value) => {
            if (value === 'eliminar') {
              this._egreso.delete(element.id).subscribe(
                (res) => {
                  swal({
                    title: 'Egreso eliminado con éxito',
                    icon: 'success'
                  });
                  this.restoreValues(index);
                },
                (err) => {
                  console.log('reventó el delete', err);
                }
              );
            }
          });
        break;

      case 'usuario':
        swal({
            title: 'Dar de baja/Eliminar usuario',
            text: 'Seleccione una opción',
            icon: 'warning',
            dangerMode: true,
            buttons: {
              cancel: {
                text: "Cancelar",
                value: 'cancel',
                visible: true,
                className: "",
                closeModal: true,
              },
              baja: {
                text: "Dar de baja",
                value: 'baja',
                visible: true,
                className: "",
                closeModal: true,
              },
              eliminar: {
                text: "Eliminar",
                value: 'eliminar',
                visible: true,
                className: "",
                closeModal: true
              }
            }
          })
          .then((value) => {
            if (value === 'baja') {
              element.fecha_baja = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
              this._usuario.updateAttributes(element).subscribe(
                (res) => {
                  swal({
                    title: 'Usuario dado de baja con éxito',
                    icon: 'success'
                  });
                  this.restoreValues(index);
                },
                (err) => {
                  console.log('reventó el delete', err);
                }
              );
            }
            if (value === 'eliminar') {
              this._usuario.delete(element.id).subscribe(
                (res) => {
                  swal({
                    title: 'Usuario eliminado con éxito',
                    icon: 'success'
                  });
                  this.restoreValues(index);
                },
                (err) => {
                  console.log('reventó el delete', err);
                }
              );
            }
          });
        break;
    }
  }

}
