import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

    restaurants? : Restaurant[]; //un tableau de restaurants

  constructor(private restaurantService: RestaurantService,
              public authService: AuthService) {
   //this.restaurants=[];
     }

  ngOnInit(): void {
    this.restaurants = this.restaurantService.listeRestaurants();
  }
  supprimerRestaurant(r: Restaurant) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.restaurantService.supprimerRestaurant(r);
    }
  }
}
