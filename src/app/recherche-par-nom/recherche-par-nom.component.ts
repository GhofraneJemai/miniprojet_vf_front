import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: []
})
export class RechercheParNomComponent implements OnInit {

  nomRestaurant!: string;
  restaurants: Restaurant[] = [];
  allRestaurants: Restaurant[] = [];
  searchTerm!: string;

  constructor(private restaurantService: RestaurantService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Récupérer la liste des restaurants via le service et se souscrire à l'observable
    this.restaurantService.listeRestaurants().subscribe(
      (restaurants) => {
        this.restaurants = restaurants;
        this.allRestaurants = restaurants;
      },
      (error) => {
        console.error('Erreur lors de la récupération des restaurants:', error);
        this.toastr.error('Erreur lors de la récupération des restaurants', 'Erreur');
      }
    );
  }

  onKeyUp(filterText: string): void {
    if (!filterText) {
      // Si le champ de recherche est vide, réinitialisez la liste des restaurants
      this.restaurants = this.allRestaurants;
    } else {
      // Filtrer les restaurants par nom
      this.restaurants = this.allRestaurants.filter(item =>
        item.nomRestaurant.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  }
}
