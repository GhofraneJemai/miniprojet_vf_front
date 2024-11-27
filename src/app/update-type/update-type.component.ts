import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Type } from '../model/type.model';  // Importer le modèle Type

@Component({
  selector: 'app-update-type',
  templateUrl: './update-type.component.html',
  styles: []
})
export class UpdateTypeComponent implements OnInit {

  @Input()
  type!: Type;  // Remplacer Categorie par Type

  @Input()
  ajout!: boolean;

  @Output() 
  typeUpdated = new EventEmitter<Type>();  // Émettre un événement de type Type

  constructor() { }

  ngOnInit(): void {
  }

  // Méthode pour sauvegarder le type et émettre l'événement
  saveType() {
    console.log('Saving type:', this.type);  // Debugging output
    this.typeUpdated.emit(this.type); // Emit the type to parent
  }
  
  // Réinitialiser les données du type pour un ajout
  modeAjout() {
    this.ajout = true;
    this.type.idType = 0;  // Réinitialiser l'ID pour un nouvel ajout
    this.type.nomType = "";  // Réinitialiser le nom du type
  }
}
