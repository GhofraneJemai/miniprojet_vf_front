import { Injectable } from '@angular/core';
import { Restaurant } from '../model/restaurant.model';
import { Type } from '../model/type.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeWrapper } from '../model/typeWrapped.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiURL: string = 'http://localhost:8080/restaurants/api';
  apiURLType: string = 'http://localhost:8080/restaurants/type';

  constructor(private http: HttpClient) { }

  listeRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiURL);
  }

  ajouterRestaurant(resto: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.apiURL, resto, httpOptions);
  }

  supprimerRestaurant(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }

  consulterRestaurant(id: number): Observable<Restaurant> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Restaurant>(url);
  }

  updateRestaurant(resto: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(this.apiURL, resto, httpOptions);
  }

  listeTypes(): Observable<TypeWrapper> {
    return this.http.get<TypeWrapper>(this.apiURLType);
  }

  ajouterType(type: Type): Observable<Type> {
    return this.http.post<Type>(this.apiURLType, type, httpOptions);
  }

  rechercherParType(idType: number): Observable<Restaurant[]> {
    const url = `${this.apiURL}/searchtype/${idType}`;
    return this.http.get<Restaurant[]>(url);
  }
  supprimerType(id: number) {
    const url = `${this.apiURLType}/${id}`;  // Construire l'URL pour l'API avec l'ID du type à supprimer
    return this.http.delete(url, httpOptions);  // Envoyer une requête DELETE à l'API pour supprimer le type
  }

}
