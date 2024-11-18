import { Component, OnInit } from '@angular/core';
import { Type } from '../model/type.model';  // Importation du modèle Type
import { RestaurantService } from '../services/restaurant.service';  // Service modifié

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
  styles: []
})
export class ListeTypesComponent implements OnInit {

  types!: Type[];  // Liste des types de cuisine

  updatedType: Type = { idType: 0, nomType: "" };  // Type à mettre à jour

  ajout: boolean = true;  // Mode ajout ou modification

  constructor(private restaurantService: RestaurantService) { }  // Utilisation de restaurantService

  ngOnInit(): void {
    this.chargerTypes();  // Charger les types de cuisine à l'initialisation
  }

  // Fonction pour charger les types de cuisine à partir du service
  chargerTypes() {
    this.restaurantService.listeTypes().subscribe(types => {
      this.types = types._embedded.types;  // Remplir la liste des types avec les données du service
      console.log(types);  // Afficher dans la console pour vérification
    });
  }

  // Fonction pour activer le mode modification (quand l'utilisateur veut modifier un type)
  updateType(type: Type) {
    this.updatedType = { ...type };  // Copier les données du type à modifier
    this.ajout = false;  // Passer en mode modification
  }

  // Fonction pour ajouter ou mettre à jour un type
  typeUpdated(type: Type) {
    console.log("Type updated event", type);
      this.restaurantService.ajouterType(type).subscribe(() => 
        this.chargerTypes());  // Recharger la liste des types après l'ajout  // Réinitialiser le formulaire
  }

  // Fonction pour supprimer un type
  supprimerType(type: Type) {
    let conf = confirm("Êtes-vous sûr de vouloir supprimer ce type?");
    if (conf) {
      this.restaurantService.supprimerType(type.idType).subscribe(() => {
        console.log("Type supprimé");
        this.chargerTypes();  // Recharger la liste des types après suppression
      });
    }
  }
}
