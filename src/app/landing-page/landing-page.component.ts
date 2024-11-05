import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

import { OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent  implements OnInit{
  constructor(private router: Router) {}

  ngOnInit() {
    AOS.init({
      duration: 1200, // Duración de la animación en milisegundos
      once: true // Para que solo se ejecute una vez cuando el usuario haga scroll
    });
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

  navigateToInicio(){
    this.router.navigate(['/landing-page']);
  }

}
