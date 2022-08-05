import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationCardComponent } from './components/locations/location-card/location-card.component';
import { LocationEditComponent } from './components/locations/location-edit/location-edit.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { TechnologyCardComponent } from './components/technologies/technology-card/technology-card.component';
import { TechnologyEditComponent } from './components/technologies/technology-edit/technology-edit.component';
import { MainRoutingModule } from './main-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const materialModules = [
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    MainComponent,
    LocationsComponent,
    LocationCardComponent,
    LocationEditComponent,
    TechnologiesComponent,
    TechnologyCardComponent,
    TechnologyEditComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    [...materialModules]
  ]
})
export class MainModule { }