import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestaurantService } from '../services/restaurant.service'; // Importer votre service
import { Type } from '../model/type.model';
import { Restaurant } from '../model/restaurant.model';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
})
export class AddRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;
  types: Type[] = []; // Pour stocker les types de cuisine

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService, // Injecter le service
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.restaurantForm = this.formBuilder.group({
      idRestaurant: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      nomRestaurant: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      adresseRestaurant: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      idType: ['', Validators.required],
      dateOuverture: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.types = this.restaurantService.listeTypes();
  }

  addRestaurant(): void {
    if (this.restaurantForm.valid) {
      const newRestaurant = this.restaurantForm.value;

      // Vérifiez si l'identifiant du restaurant existe déjà
      const existingRestaurant = this.restaurantService.consulterRestaurant(newRestaurant.idRestaurant);
      if (existingRestaurant) {
        this.toastr.error('L\'identifiant du restaurant existe déjà. Veuillez en choisir un autre.', 'Erreur');
        return;
      }

      // Obtenez le type de cuisine en fonction de l'ID sélectionné
      const newType = this.restaurantService.consulterType(newRestaurant.idType);
      newRestaurant.type = newType;    

      this.restaurantService.ajouterRestaurant(newRestaurant);

      this.restaurantForm.reset();

      this.toastr.success('Restaurant ajouté avec succès', 'Succès');
      this.router.navigate(['restaurants']);
    } else {
      this.toastr.error('Veuillez remplir tous les champs requis', 'Erreur');
    }
  }
}
