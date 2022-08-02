import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Location } from '../../interfaces/location.interface';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations!: Location[];

  constructor(private getService: LocationService) { }

  ngOnInit(): void {
    this.getService.getAllLocations$().pipe(take(1)).subscribe({
      next: ((resp: Location[]) => {
        this.locations = resp;
        console.log(this.locations);
      })
    }
    )
  }

}
