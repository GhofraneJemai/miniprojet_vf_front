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
  restaurantForm!: FormGroup;
  types: Type[] = [];  // Initialisation des types avec une liste vide
  currentRestaurant!: Restaurant;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const restaurantId = this.activatedRoute.snapshot.params['id'];

    // Récupérer les détails du restaurant
    this.restaurantService.consulterRestaurant(restaurantId).subscribe({
      next: (restaurant: Restaurant) => {  
        this.currentRestaurant = restaurant;
        this.initializeForm(); // Initialiser le formulaire après avoir récupéré les données du restaurant
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du restaurant:', error);
        this.toastr.error('Erreur lors de la récupération du restaurant', 'Erreur');
      }
    });

    // Charger les types de cuisine
    this.restaurantService.listeTypes().subscribe({
      next: (types) => {
        this.types = types._embedded.types; // Supposé que les types viennent sous cette forme
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des types:', error);
        this.toastr.error('Erreur lors de la récupération des types', 'Erreur');
      }
    });
  }

  private initializeForm() {
    // Initialisation du formulaire après récupération des données
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
      // Mettre à jour l'objet currentRestaurant avec les valeurs du formulaire
      Object.assign(this.currentRestaurant, this.restaurantForm.value);

      // Assigner correctement le type sélectionné
      const selectedType = this.types.find(type => type.idType === +this.restaurantForm.value.idType);
      if (selectedType) {
        this.currentRestaurant.type = selectedType;
      } else {
        this.toastr.error('Le type de cuisine sélectionné est invalide', 'Erreur');
        return;
      }

      // Appeler le service pour mettre à jour le restaurant
      this.restaurantService.updateRestaurant(this.currentRestaurant).subscribe({
        next: () => {
          this.toastr.success('Le restaurant a été mis à jour avec succès !', 'Mise à Jour Réussie');
          this.router.navigate(['restaurants']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du restaurant:', error);
          this.toastr.error('Une erreur est survenue lors de la mise à jour', 'Erreur');
        }
      });
    } else {
      this.toastr.error('Veuillez remplir tous les champs requis.', 'Erreur de Validation');
    }
  }
}
