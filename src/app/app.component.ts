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

  ngOnInit(): void {
    // Vérifier si nous sommes dans un environnement de navigateur
    if (typeof window !== 'undefined' && window.localStorage) {
      let isloggedin: string;
      let loggedUser: string;

      // Récupérer les données depuis le localStorage, avec une valeur par défaut vide si null
      isloggedin = localStorage.getItem('isloggedIn') || '';
      loggedUser = localStorage.getItem('loggedUser') || '';

      // Vérifier si l'utilisateur est connecté
      if (isloggedin !== "true" || !loggedUser) {
        // Si l'utilisateur n'est pas connecté, rediriger vers la page de login
        this.router.navigate(['/login']);
      } else {
        // Si l'utilisateur est connecté, définir l'utilisateur à partir du localStorage
        this.authService.setLoggedUserFromLocalStorage(loggedUser);
      }
    }
  }

  onLogout(): void {
    this.authService.logout();
    // Après la déconnexion, rediriger l'utilisateur vers la page de login
    this.router.navigate(['/login']);
  }
}
