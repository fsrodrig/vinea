import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileItem} from '../file-item.model';
import {ImgUploadService} from '../imgUpload.service';

@Component({
    selector: 'app-img-upload',
    templateUrl: './img-upload.component.html',
    styleUrls: [
        './img-upload.scss'
    ]
})
export class ImgUploadComponent {

    @Input() llamadoPor: string;
    @Output() onUpload = new EventEmitter<string>();

    estaSobreDropZone = false;
    permiteCargar = true;
    isCargada = false;

    archivos: FileItem[] = [];

    constructor(public _cargaImagenes: ImgUploadService) {
    }

    archivoSobreDropZone(e: boolean) {
        this.estaSobreDropZone = e;
    }

    cargarImagenesFirebase() {
        this.permiteCargar = false;
        this._cargaImagenes.cargar_imagenes_firebase(this.archivos, this.llamadoPor).then(
            (value: string) => {
                this.isCargada = true;
                this.onUpload.emit(value);
            });
    }

    limpiarArchivos() {
        this.isCargada = false;
        // this._cargaImagenes.eliminar_imagenes_firebase
        this.onUpload.emit('');
        this.archivos = [];
        this.permiteCargar = true;
    }

}
