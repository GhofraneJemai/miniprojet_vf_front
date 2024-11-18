import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

  restaurants?: Restaurant[];  // Un tableau de restaurants

  constructor(
    private restaurantService: RestaurantService,
    public authService: AuthService,
    private toastr: ToastrService  // Service pour les notifications
  ) {}

  ngOnInit(): void {
    // Récupérer la liste des restaurants via le service
    this.restaurantService.listeRestaurants().subscribe(
      (restaurants) => {
        this.restaurants = restaurants;
      },
      (error) => {
        console.error('Erreur lors de la récupération des restaurants:', error);
        this.toastr.error('Erreur lors de la récupération des restaurants', 'Erreur');
      }
    );
  }

  supprimerRestaurant(r: Restaurant): void {
    const conf = confirm("Êtes-vous sûr ?");
    if (conf) {
      // Suppression du restaurant via le service
      this.restaurantService.supprimerRestaurant(r.idRestaurant).subscribe(
        () => {
          // Suppression réussie, mettre à jour la liste des restaurants
          this.restaurants = this.restaurants?.filter(restaurant => restaurant.idRestaurant !== r.idRestaurant);
          this.toastr.success('Restaurant supprimé avec succès', 'Succès');
        },
        (error) => {
          console.error('Erreur lors de la suppression du restaurant:', error);
          this.toastr.error('Erreur lors de la suppression du restaurant', 'Erreur');
        }
      );
    }
  }
}
