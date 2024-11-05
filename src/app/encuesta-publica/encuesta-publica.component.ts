import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../model/encuestas/Encuesta';
import { Router } from '@angular/router';
import { SurveyService } from '../service/Survey.service';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../views/clubes/sidenav/sidenav.component';

@Component({
  selector: 'app-encuesta-publica',
  standalone: true,
  imports: [
    CommonModule,  SidenavComponent 
  ],
  templateUrl: './encuesta-publica.component.html',
  styleUrl: './encuesta-publica.component.css'
})
export class EncuestaPublicaComponent implements OnInit {
  encuestas: Encuesta[] = [];

  constructor(private encuestaService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerEncuestas();
  }

  obtenerEncuestas(): void {
    this.encuestaService.obtenerTodasLasEncuestas().subscribe({
      next: (data: Encuesta[]) => {
        this.encuestas = data;
      },
      error: (error) => {
        console.error('Error al obtener encuestas:', error);
      }
    });
  }

  responderEncuesta(idEncuesta: number): void {
    this.router.navigate([`/responder-encuesta/${idEncuesta}`]);
  }


  navigateToInicio(){
    this.router.navigate(['/landing-page']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToNoticias() {
    this.router.navigate(['/noticias']);
  }

  navigateToEncuestas() {
    this.router.navigate(['/encuestas-publicas']);
  }
}
