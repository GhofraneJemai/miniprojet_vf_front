import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';

import { FormsModule } from '@angular/forms';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';


@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    AddRestaurantComponent,
    UpdateRestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
