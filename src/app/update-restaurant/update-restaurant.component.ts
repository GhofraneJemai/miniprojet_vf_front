import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../model/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styles: ``
})
export class UpdateRestaurantComponent implements OnInit {
  restaurant: Restaurant | undefined; // Initialisation

  currentRestaurant = new Restaurant();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private restaurantService: RestaurantService) { }
              

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id']);
    this.currentRestaurant = this.restaurantService.consulterRestaurant(this.activatedRoute.snapshot.params['id']);
    console.log(this.currentRestaurant);
  }

  updateRestaurant() {
    this.restaurantService.updateRestaurant(this.currentRestaurant);
    this.router.navigate(['restaurants']);
  }
}
