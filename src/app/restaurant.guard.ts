import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantGuard implements CanActivate {
 
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAdmin()) {
      return true; // L'utilisateur est un administrateur, on autorise l'accès
    } else {
      this.router.navigate(['forbidden']); // Redirection si l'utilisateur n'est pas un administrateur
      return false;
    }
  }
}
