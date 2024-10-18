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
  restaurants? : Restaurant[];
  IdType!: number; 
  types!: Type[]; 

  constructor(private restaurantService: RestaurantService,
              private router: Router,
  ) {
    //this.restaurants=[];
      }
      ngOnInit(): void {
        this.restaurants = this.restaurantService.listeRestaurants();
        this.types = this.restaurantService.listeTypes();
      }
      supprimerRestaurant(r: Restaurant) {
        let conf = confirm("Etes-vous sûr ?");
        if (conf) {
          this.restaurantService.supprimerRestaurant(r);
        }
        this.restaurants = this.restaurantService.rechercherParType(this.IdType);
      }
      onChange(){
        //console.log(this.IdType);
        this.restaurants = this.restaurantService.rechercherParType(this.IdType);
        console.log(this.restaurants);
      }

}
