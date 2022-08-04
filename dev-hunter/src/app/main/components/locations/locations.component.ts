import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private getService: LocationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getService.getAllLocations$().pipe(take(1)).subscribe({
      next: ((resp: Location[]) => {
        this.locations = resp;
      })
    }
    )
  }

  onEdit(location: Location): void {
    this.router.navigate(['locations', 'edit', location.id]);
  }

  onDelete(location: Location): void {
    this.getService.deleteLocation$(location.id!).pipe(take(1)).subscribe({
      next: (() => {
        this.locations = this.locations.filter(l => l.id !== location.id);
      })
    });
  }
}
