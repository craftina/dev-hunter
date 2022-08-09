import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationCardComponent } from './components/locations/location-card/location-card.component';
import { LocationEditComponent } from './components/locations/location-edit/location-edit.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { TechnologyCardComponent } from './components/technologies/technology-card/technology-card.component';
import { TechnologyEditComponent } from './components/technologies/technology-edit/technology-edit.component';
import { DevelopersComponent } from './components/developers/developers.component';
import { DeveloperCardComponent } from './components/developers/developer-card/developer-card.component';
import { DeveloperEditComponent } from './components/developers/developer-edit/developer-edit.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';

const materialModules = [
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    MainComponent,
    LocationsComponent,
    LocationCardComponent,
    LocationEditComponent,
    TechnologiesComponent,
    TechnologyCardComponent,
    TechnologyEditComponent,
    DevelopersComponent,
    DeveloperCardComponent,
    DeveloperEditComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    [...materialModules]
  ]
})
export class MainModule { }