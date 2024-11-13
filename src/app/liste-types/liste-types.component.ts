import { Component, OnInit } from '@angular/core';
import { TypeService } from '../services/type.service';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
  styles: [
  ]
})
export class ListeTypesComponent implements OnInit {

  types!: Type[];  // Liste des types
  updatedType: Type = { idType: 0, nomType: "" };  // Type à mettre à jour
  ajout: boolean = true;  // Mode ajout ou modification
  currentId: number = 0;

  constructor(private typeService: TypeService) { }

  ngOnInit(): void {
    this.chargerTypes();  // Charger les types de cuisine à l'initialisation
  }

  // Fonction pour charger les types de cuisine à partir du service
  chargerTypes() {
    this.typeService.listeTypes().subscribe(types => {
      this.types = types;  // Remplir la liste des types avec les données du service
      console.log(this.types);  // Afficher dans la console pour vérification
      // Trouver le dernier ID utilisé pour commencer l'incrémentation
      if (this.types.length > 0) {
        this.currentId = Math.max(...this.types.map(type => type.idType));
      }
    });
  }

  // Fonction pour activer le mode modification
  updateType(type: Type) {
    this.updatedType = { ...type };  // Copier les données du type à modifier
    this.ajout = false;  // Passer en mode modification
  }

  // Fonction pour mettre à jour un type
  typeUpdated(type: Type) {
    console.log("Type updated event", type);
    /*
    // Si le type existe déjà dans le tableau, le mettre à jour
    const index = this.types.findIndex(t => t.idType === type.idType);
    if (index !== -1) {
      this.types[index] = { ...type };  // Remplacer le type modifié
    } else {
      // Sinon, ajouter un nouveau type
      this.types.push({ ...type });
    }*/
      if (this.ajout) {
        // Si c'est un ajout, incrémenter l'ID et ajouter le type
        this.currentId++;  // Incrémenter l'ID
        type.idType = this.currentId;  // Assigner l'ID au type ajouté
        this.types.push({ ...type });
      } else {
        // Sinon, mettre à jour le type existant
        const index = this.types.findIndex(t => t.idType === type.idType);
        if (index !== -1) {
          this.types[index] = { ...type };  // Remplacer le type modifié
        }
      }
  }
}