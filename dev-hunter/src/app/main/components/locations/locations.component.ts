import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Developer } from '../../interfaces/developer.interface';
import { Location } from '../../interfaces/location.interface';
import { DeveloperService } from '../../services/developer.service';
import { LocationService } from '../../services/location.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations!: Location[];
  loading: boolean = true;
  developers!: Developer[];

  constructor(
    private locationService: LocationService,
    private developerService: DeveloperService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.locationService.getAllLocations$().pipe(take(1)).subscribe({
      next: ((resp: Location[]) => {
        this.loading = false;
        this.locations = resp;
      })
    })
  }

  onEdit(location: Location): void {
    this.router.navigate(['locations', 'edit', location.id]);
  }

  onDelete(location: Location): void {
    this.developerService.getDevelopersByLocationId$(location.id!).pipe(take(1)).subscribe({
      next: ((res) => {
        this.developers = res;
        if (this.developers.length < 1) {
          this.locationService.deleteLocation$(location.id!).pipe(take(1)).subscribe({
            next: (() => {
              this.locations = this.locations.filter(l => l.id !== location.id);
            })
          })
        } else {
          this.dialog.open(ModalComponent, { data: "You cannot delete this location, a developer has been assigned to it." });
        }
      })
    })
  }
}
