import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiresAuth = route.data['requiresAuth'] === true;

    if (requiresAuth && !this.authService.loggedIn) {
      // Redirigir al login si la ruta requiere autenticación y el usuario no está autenticado
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
