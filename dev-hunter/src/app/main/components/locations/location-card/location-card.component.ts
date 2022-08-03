import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/main/interfaces/location.interface';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent {

  @Input() location!: Location;
  locationImageUrl: string = '../../../assets/images/location-image.png';

  constructor(
    private router: Router,
  ) { }

  onEdit(location: Location): void {
    console.log(location);
    this.router.navigate(['locations', 'edit', location.id])
  }

}
