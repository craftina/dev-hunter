import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationCardComponent } from './components/locations/location-card/location-card.component';
import { MainRoutingModule } from './main-routing.module';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    MainComponent,
    LocationsComponent,
    LocationCardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    [...materialModules]
  ]
})
export class MainModule { }
