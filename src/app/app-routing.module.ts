import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';

const routes: Routes = [
  {path: "restaurants", component : RestaurantsComponent},
  {path: "add-restaurant", component : AddRestaurantComponent},
  {path: "updateRestaurant/:id", component: UpdateRestaurantComponent},
  { path: "", redirectTo: "restaurants", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
