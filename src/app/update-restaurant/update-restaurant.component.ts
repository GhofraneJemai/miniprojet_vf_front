import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../model/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { Type } from '../model/type.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styles: []
})
export class UpdateRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;  // Déclaration du FormGroup
  types!: Type[];
  currentRestaurant!: Restaurant;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder ,// Injection du FormBuilder
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const restaurantId = this.activatedRoute.snapshot.params['id'];
    this.currentRestaurant = this.restaurantService.consulterRestaurant(restaurantId);
    
    // Initialisation du formulaire avec les valeurs actuelles du restaurant
    this.initializeForm();
    this.types = this.restaurantService.listeTypes();
  }

  private initializeForm() {
    this.restaurantForm = this.formBuilder.group({
      idRestaurant: [{ value: this.currentRestaurant.idRestaurant, disabled: true }, Validators.required],
      nomRestaurant: [this.currentRestaurant.nomRestaurant, [Validators.required, Validators.minLength(3)]], 
      adresseRestaurant: [this.currentRestaurant.adresseRestaurant, [Validators.required, Validators.minLength(5)]], 
      idType: [this.currentRestaurant.type?.idType, Validators.required],
      dateOuverture: [this.currentRestaurant.dateOuverture, Validators.required],
      email: [this.currentRestaurant.email, [Validators.required, Validators.email]] 
    });
  }

  updateRestaurant() {
    if (this.restaurantForm.valid) {
        // Mettez à jour les valeurs du restaurant actuel avec celles du formulaire
        Object.assign(this.currentRestaurant, this.restaurantForm.value);

        // Assurez-vous que le type est correctement assigné
        this.currentRestaurant.type = this.restaurantService.consulterType(this.restaurantForm.value.idType);

        this.restaurantService.updateRestaurant(this.currentRestaurant);

        this.toastr.success('Le restaurant a été mis à jour avec succès !', 'Mise à Jour Réussie');
        this.router.navigate(['restaurants']);
    } else {
        this.toastr.error('Veuillez remplir tous les champs requis.', 'Erreur de Validation');
    }
}


}
