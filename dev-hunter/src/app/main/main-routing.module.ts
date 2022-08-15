import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationEditComponent } from './components/locations/location-edit/location-edit.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { TechnologyEditComponent } from './components/technologies/technology-edit/technology-edit.component';
import { DevelopersComponent } from './components/developers/developers.component';
import { DeveloperEditComponent } from './components/developers/developer-edit/developer-edit.component';
import { DeveloperProfileComponent } from './components/developers/developer-profile/developer-profile.component';
import { HiringComponent } from './components/hiring/hiring.component';
import { HiredComponent } from './components/hired/hired.component';

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
        path: 'technologies/create',
        component: TechnologyEditComponent
      },
      {
        path: 'technologies/edit/:id',
        component: TechnologyEditComponent
      },
      {
        path: 'developers',
        component: DevelopersComponent
      },
      {
        path: 'developers/create',
        component: DeveloperEditComponent
      },
      {
        path: 'developers/:id',
        component: DeveloperProfileComponent
      },
      {
        path: 'developers/:id/edit',
        component: DeveloperEditComponent
      },
      {
        path: 'hiring',
        component: HiringComponent
      },
      {
        path: 'hired',
        component: HiredComponent
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