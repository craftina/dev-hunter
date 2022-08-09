import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Location } from '../../interfaces/location.interface';
import { LocationService } from '../../services/location.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations!: Location[];
  loading: boolean = true;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.locationService.getAllLocations$().pipe(take(1)).subscribe({
      next: ((resp: Location[]) => {
        this.loading = false;
        this.locations = resp;
      }),
      error: ((error: HttpErrorResponse) => {
        this.loading = false;
      })
    })
  }

  onEdit(location: Location): void {
    this.router.navigate(['locations', 'edit', location.id]);
  }

  onDelete(location: Location): void {
    if (location.developers!.length < 1) {
      this.locationService.deleteLocation$(location.id!).pipe(take(1)).subscribe({
        next: (() => {
          this.locations = this.locations.filter(l => l.id !== location.id);
        })
      })
    } else {
      const devText = location.developers!.length > 1 ? `${location.developers!.length} developers` : '1 developer';
      this.dialog.open(ModalComponent, {
        data: `You cannot delete this location, ${devText} has been assigned to it.`
      });
    }
  }
}
