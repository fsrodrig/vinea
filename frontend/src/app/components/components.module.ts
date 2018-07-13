import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { SharedCommonsModule } from '../shared/shared-commons.module';
import { RouterModule } from '@angular/router';

//Componentes
import { 
    TablaComponent,
    PasswordStrengthBarComponent,
    ImgUploadComponent,
    ImgUploadService
} from './components.index';

@NgModule({
    declarations: [
        TablaComponent,
        PasswordStrengthBarComponent,
        ImgUploadComponent
    ],
    exports: [
        TablaComponent,
        PasswordStrengthBarComponent,
        ImgUploadComponent
    ],
    imports: [
        SharedModule,
        SharedCommonsModule,
        FormsModule,
        RouterModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule
    ],
    providers: [
        ImgUploadService
    ]
})

export class ComponentsModule { }