import { Injectable } from '@angular/core';
import { Restaurant } from '../model/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restaurants: Restaurant[]; // un tableau de restaurants
  
  constructor() { 
    this.restaurants = [
      {idRestaurant: 1, nomRestaurant: "Le Gourmet", adresseRestaurant: "123 Rue Principale", typeCuisine:"Française",dateOuverture: new Date("01/14/2011")},
      {idRestaurant: 2, nomRestaurant: "Pizza Palace", adresseRestaurant: "456 Avenue des Champs",typeCuisine:"Italienne", dateOuverture: new Date("12/17/2010")},
      {idRestaurant: 3, nomRestaurant: "Sushi World", adresseRestaurant: "789 Boulevard du Sushi",typeCuisine:"japonaise", dateOuverture: new Date("02/20/2020")}
    ];
  }
  listeRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  ajouterRestaurant(resto: Restaurant) {
    this.restaurants.push(resto);
  }

  supprimerRestaurant(resto: Restaurant) {
    const index = this.restaurants.indexOf(resto, 0);
    if (index > -1) {
      this.restaurants.splice(index, 1);
    }
  }

  consulterRestaurant(id: number): Restaurant {
    return this.restaurants.find(r => r.idRestaurant == id)!;
  }

  trierRestaurants() {
    this.restaurants = this.restaurants.sort((n1, n2) => {
      if (n1.idRestaurant! > n2.idRestaurant!) {
        return 1;
      }
      if (n1.idRestaurant! < n2.idRestaurant!) {
        return -1;
      }
      return 0;
    });
  }
  
  updateRestaurant(r: Restaurant) {
    this.supprimerRestaurant(r);
    this.ajouterRestaurant(r);
    this.trierRestaurants();
  }
}
