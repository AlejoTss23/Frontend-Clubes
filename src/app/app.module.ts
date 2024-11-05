import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ClubesComponent } from './views/clubes/clubes.component';
import { MatTableModule } from '@angular/material/table';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorEsp } from './resource/mat-paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FilterPipe } from './mapa-ubicacion/FilterPipe';
import { CalendarOption } from '@fullcalendar/angular/private-types';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Importa los componentes standalone
import { ClubesModalComponent } from './views/clubes/clubes-modal/clubes-modal.component';
import { ConfirmDialogComponent } from './views/clubes/confirm-dialog/confirm-dialog.component';
import { SidenavComponent } from './views/clubes/sidenav/sidenav.component';
import { EmailContactsComponent } from './email-contacts/email-contacts.component';
import { MapaUbicacionComponent } from './mapa-ubicacion/mapa-ubicacion.component';
import { CalendarioClubesComponent } from './calendario-clubes/calendario-clubes.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { JwtInterceptor } from './auth.interceptor';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { GestionCuentasComponent } from './gestion-cuentas/gestion-cuentas.component';
import { NoticiaCrudComponent } from './noticia-crud/noticia-crud.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ResponderEncuestaComponent } from './responder-encuesta/responder-encuesta.component';



@NgModule({
  declarations: [
    AppComponent,
    ClubesComponent,
    EmailContactsComponent,
    MapaUbicacionComponent,
    FilterPipe,
    CalendarioClubesComponent,
    LoginComponent,
    DetailModalComponent,
    GestionCuentasComponent,
    NoticiaCrudComponent,
    NoticiasComponent,
    ImageUploadComponent,
    ResponderEncuestaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FullCalendarModule,
    ReactiveFormsModule,    
    // Importa los componentes standalone
    ClubesModalComponent,
    ConfirmDialogComponent,
    SidenavComponent,
    LandingPageComponent,
  

    
],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorEsp },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
