import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Type } from '../model/type.model'; // Assurez-vous d'avoir un modèle Type

@Component({
  selector: 'app-update-type',
  templateUrl: './update-type.component.html',
  styles: []
})
export class UpdateTypeComponent implements OnInit {

  @Input()
  type!: Type; // Définir le type avec la structure appropriée

  @Input()
  ajout!: boolean; // Indiquer si c'est un mode ajout ou modification

  @Output()
  typeUpdated = new EventEmitter<Type>(); // Émettre l'objet type lors de la sauvegarde

  constructor() { }

  ngOnInit(): void {
    // Logique d'initialisation si nécessaire
  }

  saveType() {
    this.typeUpdated.emit(this.type); // Émettre l'événement avec le type modifié ou ajouté
  }

  modeAjout() {
    this.ajout = true;
    this.type.idType = 0; // Réinitialiser l'ID pour l'ajout
    this.type.nomType = ""; // Réinitialiser le nom pour l'ajout
  }
}
