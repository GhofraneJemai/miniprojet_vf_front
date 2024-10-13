import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html'
})
export class AddRestaurantComponent implements OnInit {

  newRestaurant = new Restaurant();
  types!: Type[];
  newIdType!: number;
  newType!: Type;
  constructor(private restaurantService: RestaurantService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.types = this.restaurantService.listeTypes();

  }

  addRestaurant() {
    this.newType = this.restaurantService.consulterType(this.newIdType);
    this.newRestaurant.type = this.newType;    
    this.restaurantService.updateRestaurant(this.newRestaurant);
    this.router.navigate(['restaurants']);
  }

}
