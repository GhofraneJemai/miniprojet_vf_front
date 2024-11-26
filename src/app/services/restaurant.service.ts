import { Injectable } from '@angular/core';
import { Restaurant } from '../model/restaurant.model';
import { Type } from '../model/type.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeWrapper } from '../model/typeWrapped.model';
import { AuthService } from './auth.service';  // Assurez-vous d'importer le service d'authentification

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiURL: string = 'http://localhost:8090/restaurants/api';
  apiURLType: string = 'http://localhost:8090/restaurants/type';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Méthode pour obtenir la liste des restaurants avec JWT
  listeRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiURL + "/all");
  }

  ajouterRestaurant(resto: Restaurant): Observable<Restaurant> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt});
    return this.http.post<Restaurant>(this.apiURL + "/addrest", resto, { headers: httpHeaders });
  }

  // Supprimer un restaurant
  supprimerRestaurant(id: number): Observable<void> {
    const url = `${this.apiURL}/delrest/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt});
    return this.http.delete<void>(url, { headers: httpHeaders });
  }

  // Consulter un restaurant par ID
  consulterRestaurant(id: number): Observable<Restaurant> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt});
    return this.http.get<Restaurant>(url, { headers: httpHeaders });
  }

  // Mettre à jour un restaurant
  updateRestaurant(resto: Restaurant): Observable<Restaurant> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt});
    return this.http.put<Restaurant>(this.apiURL + "/updaterest", resto, { headers: httpHeaders });
  }

  // Rechercher des restaurants par type
  rechercherParType(idType: number): Observable<Restaurant[]> {
    const url = `${this.apiURL}/restbytype/${idType}`;
    return this.http.get<Restaurant[]>(url);
  }

  // Trier les restaurants par nom et adresse
  trierRestaurants(): Observable<Restaurant[]> {
    const url = `${this.apiURL}/sort`;
    return this.http.get<Restaurant[]>(url);
  }

  listeTypes(): Observable<TypeWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt});
    return this.http.get<TypeWrapper>(this.apiURLType, { headers: httpHeaders });
  }

  ajouterType(type: Type): Observable<Type> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt});
    return this.http.post<Type>(this.apiURLType, type, { headers: httpHeaders });
  }

  supprimerType(id: number): Observable<void> {
    const url = `${this.apiURLType}/delete/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt});
    return this.http.delete<void>(url, { headers: httpHeaders });
  }
}
