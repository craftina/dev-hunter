import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { LocationsComponent } from './components/locations/locations.component';



@NgModule({
  declarations: [
    MainComponent,
    LocationsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
