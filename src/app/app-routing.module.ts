import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { RechercheParTypeComponent } from './recherche-par-type/recherche-par-type.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RestaurantGuard } from './restaurant.guard';


const routes: Routes = [
  {path: "restaurants", component : RestaurantsComponent},
  {path: "add-restaurant", component : AddRestaurantComponent , canActivate:[RestaurantGuard]},
  {path: "updateRestaurant/:id", component: UpdateRestaurantComponent},
  {path: "rechercheParType", component : RechercheParTypeComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  { path: "", redirectTo: "restaurants", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
