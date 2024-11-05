import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubesComponent } from './views/clubes/clubes.component';
import { SidenavComponent } from './views/clubes/sidenav/sidenav.component';
import { ContactosComponent } from './contactos/contactos/contactos.component';
import { EmailContactsComponent } from './email-contacts/email-contacts.component';
import { MapaUbicacionComponent } from './mapa-ubicacion/mapa-ubicacion.component';
import { CalendarioClubesComponent } from './calendario-clubes/calendario-clubes.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GestionCuentasComponent } from './gestion-cuentas/gestion-cuentas.component';
import { NoticiaCrudComponent } from './noticia-crud/noticia-crud.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { AdminEncuestaComponent } from './admin-encuesta/admin-encuesta.component';
import { EncuestaPublicaComponent } from './encuesta-publica/encuesta-publica.component';
import { ResponderEncuestaComponent } from './responder-encuesta/responder-encuesta.component';

const routes: Routes = [
  { path: '', redirectTo: '/landingpage', pathMatch: 'full' },
  { path: 'landingpage', component: LandingPageComponent },
  { path: 'encuestas-publicas', component: EncuestaPublicaComponent },
  { path: 'responder-encuesta/:id', component: ResponderEncuestaComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: SidenavComponent, canActivate: [AuthGuard], data: { requiresAuth: true } },
  { path: 'clubes', component: ClubesComponent, canActivate: [AuthGuard], data: { requiresAuth: true } },
  { path: 'contacto', component: ContactosComponent, canActivate: [AuthGuard], data: { requiresAuth: true } },
  { path: 'mail', component: EmailContactsComponent, canActivate: [AuthGuard], data: { requiresAuth: true } },
  { path: 'ubicacion-clubes', component: MapaUbicacionComponent, canActivate: [AuthGuard], data: { requiresAuth: true } },
  { path: 'calendario', component: CalendarioClubesComponent, canActivate: [AuthGuard], data: { requiresAuth: true } },
  { path: 'gestion-cuentas', component: GestionCuentasComponent, canActivate: [AuthGuard], data:{ requiresAuth: true } },
  { path: 'noticias-admin', component: NoticiaCrudComponent,  canActivate: [AuthGuard], data:{ requiresAuth: true }  },
  { path: 'Admin-encuesta', component: AdminEncuestaComponent,  canActivate: [AuthGuard], data:{ requiresAuth: true }  },
  { path: '**', redirectTo: '/landingpage', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
