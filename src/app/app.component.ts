import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-clubes';

  // Inyecta el AuthService en el constructor
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Verifica si el usuario está autenticado al iniciar la aplicación
    if (!this.authService.loggedIn && this.router.url === '/') {
      this.router.navigate(['/landingpage']);
    }
  }
}
