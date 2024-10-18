import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: []
})
export class RechercheParNomComponent implements OnInit {

  nomRestaurant!: string;
  restaurants!: Restaurant[];
  allRestaurants!: Restaurant[];
  searchTerm!: string;
  
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurants = this.restaurantService.listeRestaurants();
    this.allRestaurants = this.restaurants;
    } 

  onKeyUp(filterText: string) {
    this.restaurants = this.allRestaurants.filter(item =>
      item.nomRestaurant.toLowerCase().includes(filterText.toLowerCase())
    );
  }

}
