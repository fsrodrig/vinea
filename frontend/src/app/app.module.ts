import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Injector } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';
import { PipesModule } from './pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// Providers
import { DatePipe } from '@angular/common';
import { AuthInterceptor } from './config/auth.interceptor';
import { AuthExpiredInterceptor } from './config/auth-expired.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    ServiceModule,
    PipesModule,
    APP_ROUTES,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [Injector]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
