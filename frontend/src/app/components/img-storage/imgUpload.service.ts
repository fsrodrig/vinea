import {Injectable} from '@angular/core';
import {FileItem} from './file-item.model';
import { AngularFirestore } from 'angularfire2/firestore'
import * as firebase from 'firebase/app';

@Injectable()
export class ImgUploadService {

    private CARPETA_IMAGENES = 'img';

    constructor(
        private db: AngularFirestore
    ) {
    }

    listaUltimasImagenes(numeroImagenes: number) // : FirebaseListObservable<any[]> 
    {

        // return this.af.list(`/${ this.CARPETA_IMAGENES}`, {
        //     query: {
        //         limitToLast: numeroImagenes
        //     }
        // })

    }

    cargar_imagenes_firebase(archivos: FileItem[], llamadoPor: string) : Promise<string> 
    {
        let storageRef = firebase.storage().ref();

        return new Promise(((resolve, reject) => {

            for (let archivo of archivos) {

                archivo.estaSubiendo = true;
                if (archivo.progreso >= 100) {
                     
                }

                let uploadTask: firebase.storage.UploadTask =
                    storageRef.child(`${ this.CARPETA_IMAGENES }/${ llamadoPor }/${ archivo.nombreArchivo }`).put(archivo.archivo);

                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot: any) => archivo.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes  ) * 100,
                    (error) => {
                        console.error('Error al subir ', error);
                        reject(error);
                    },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then(
                            (url) => {
                                archivo.url = url;
                                archivo.estaSubiendo = false;
                                this.guardarImangen({nombre: archivo.nombreArchivo, url: archivo.url}, llamadoPor);
                                resolve(archivo.url);
                            }
                        );
                        
                    }
                );
            }

        }));
    }

    private guardarImangen(imagen: any, llamadoPor: string) {
        this.db.collection(`/${ this.CARPETA_IMAGENES}`)
            .add(imagen);
    }

   /* eliminar_imagenes_firebase(, llamadoPor: string) {
        this.deleteFileData(upload.$key)
            .then( () => {
                this.deleteFileStorage(upload.name)
            })
            .catch((error) => console.log(error))
    }

    // Deletes the file details from the realtime db
    private deleteFileData(key: string, llamadoPor: string) {
        return this.af.list(`${this.CARPETA_IMAGENES}/${ llamadoPor }`).remove(key);
    }

    // Firebase files must have unique names in their respective storage dir
    // So the name serves as a unique key
    private deleteFileStorage(name: string, llamadoPor: string) {
        let storageRef = firebase.storage().ref();
        storageRef.child(`${ this.CARPETA_IMAGENES }/${ llamadoPor }/${name}`).delete()
    }*/
}
