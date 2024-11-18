import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestaurantService } from '../services/restaurant.service';
import { Type } from '../model/type.model';
import { Restaurant } from '../model/restaurant.model';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
})
export class AddRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;
  types: Type[] = []; // Liste des types de cuisine

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec les champs requis
    this.restaurantForm = this.formBuilder.group({
      nomRestaurant: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      adresseRestaurant: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      idType: ['', Validators.required],
      dateOuverture: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    // Chargement des types de cuisine disponibles
    this.restaurantService.listeTypes().subscribe(
      (types) => {
        this.types = types._embedded.types;
      },
      (error) => {
        console.error('Erreur lors de la récupération des types:', error);
        this.toastr.error('Impossible de charger les types de cuisine', 'Erreur');
      }
    );
  }

  addRestaurant(): void {
    if (this.restaurantForm.valid) {
      const formData = this.restaurantForm.value;

      // Récupération du type sélectionné par l'utilisateur
      const selectedType = this.types.find((type) => type.idType === +formData.idType);

      if (!selectedType) {
        this.toastr.error('Le type de cuisine sélectionné est invalide', 'Erreur');
        return;
      }

      const newRestaurant: Restaurant = {
        ...formData,
        type: selectedType,
      };

      // Envoi des données au service pour ajouter le restaurant
      this.restaurantService.ajouterRestaurant(newRestaurant).subscribe(
        () => {
          this.toastr.success('Restaurant ajouté avec succès', 'Succès');
          this.restaurantForm.reset();
          this.router.navigate(['restaurants']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du restaurant:', error);
          this.toastr.error('Une erreur est survenue lors de l\'ajout', 'Erreur');
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs requis', 'Erreur');
    }
  }
}
