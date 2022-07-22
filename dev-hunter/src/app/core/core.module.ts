import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatGridListModule
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule, 
    [...materialModules]
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ]
})
export class CoreModule { }
