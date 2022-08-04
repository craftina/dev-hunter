import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationEditComponent } from './components/locations/location-edit/location-edit.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';

const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'locations',
        component: LocationsComponent
      },
      {
        path: 'locations/create',
        component: LocationEditComponent
      },
      {
        path: 'locations/edit/:id',
        component: LocationEditComponent
      },
      {
        path: 'technologies',
        component: TechnologiesComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }