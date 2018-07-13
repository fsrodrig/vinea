import {
  Component,
  OnInit
} from '@angular/core';
import { BreadcrumbsService } from '../../services/service.index';
import { Title, Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  seccion: string;
  subseccion: string;

  constructor(
    private _breadcrumbs: BreadcrumbsService,
    public title: Title,
    public meta: Meta) {
    
    this.seccion = '';
    this.subseccion = '';

    this._breadcrumbs.getDataRoute()
      .subscribe((data) => {
        // Seteo el título en el BreadCrumb
        this.seccion = data.titulo;
        if (data.subtitulo) {
          this.subseccion = data.subtitulo;
        } else {
          this.subseccion = '';
        }
        // Seteo el título de la página
        this.title.setTitle = data.titulo;
        // Seteo los metaTags para el SEO
        this.meta.updateTag({ name: 'description', content: data.titulo })
      });
  }

  ngOnInit() {}

  

}
