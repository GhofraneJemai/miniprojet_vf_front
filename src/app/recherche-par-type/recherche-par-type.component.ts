import { Component } from '@angular/core';
import { Restaurant } from '../model/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { Type } from '../model/type.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-par-type',
  templateUrl: './recherche-par-type.component.html'
})
export class RechercheParTypeComponent {
  restaurants?: Restaurant[];
  IdType!: number;
  types!: Type[];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantService.listeRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });

    this.restaurantService.listeTypes().subscribe(typesWrapper => {
      console.log(typesWrapper);
      this.types = typesWrapper._embedded.types;
    });
  }

  supprimerRestaurant(r: Restaurant) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.restaurantService.supprimerRestaurant(r.idRestaurant).subscribe(() => {
        this.onChange(); // Rafraîchir la liste après suppression
      });
    }
  }

  onChange() {
    if (this.IdType) {
      this.restaurantService.rechercherParType(this.IdType).subscribe(restaurants => {
        this.restaurants = restaurants;
        console.log(this.restaurants);
      });
    } else {
      this.restaurantService.listeRestaurants().subscribe(restaurants => {
        this.restaurants = restaurants;
      });
    }
  }
}
