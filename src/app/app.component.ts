import { Component, OnInit } from '@angular/core'; 
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'restaurant_v1';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit () {

    this.authService.loadToken();
    if (this.authService.getToken()==null ||
     this.authService.isTokenExpired())
    this.router.navigate(['/login']);
    }

  onLogout(): void {
    this.authService.logout();
    // Après la déconnexion, rediriger l'utilisateur vers la page de login
    this.router.navigate(['/login']);
  }
}
