import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationEditComponent } from './components/locations/location-edit/location-edit.component';

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