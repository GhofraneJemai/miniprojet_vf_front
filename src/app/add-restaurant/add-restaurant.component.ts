import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html'
})
export class AddRestaurantComponent implements OnInit {

  newRestaurant = new Restaurant();
  constructor(private restaurantService: RestaurantService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }

  addRestaurant() {
    this.restaurantService.updateRestaurant(this.newRestaurant);
    this.router.navigate(['restaurants']);
  }

}
