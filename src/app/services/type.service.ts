import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Type } from '../model/type.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  // Tableau local des types de cuisine avec leurs sous-catégories
  /* private types: Type[] = [
    { idType: 1, nomType: "Cuisine européenne" },  // Inclut : française, italienne, espagnole, grecque
    { idType: 2, nomType: "Cuisine asiatique" },    // Inclut : chinoise, japonaise, thaïlandaise, vietnamienne
    { idType: 3, nomType: "Cuisine mexicaine et latino-américaine" },  // Inclut : mexicaine
    { idType: 4, nomType: "Cuisine indienne et du sous-continent" },   // Inclut : indienne
    { idType: 5, nomType: "Cuisine méditerranéenne" }, // Inclut : méditerranéenne, marocaine, tunisienne
    { idType: 6, nomType: "Cuisine américaine" },   // Inclut : américaine
    { idType: 7, nomType: "Cuisine du Moyen-Orient" }
  ]; */

  constructor() { }

  // Méthode pour récupérer la liste des types sous forme d'Observable
  /* listeTypes(): Observable<Type[]> {
    return of(this.types); // Transforme le tableau en Observable
  } */
}
