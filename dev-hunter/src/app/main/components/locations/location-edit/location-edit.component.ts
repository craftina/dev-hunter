import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Location } from 'src/app/main/interfaces/location.interface';
import { LocationService } from 'src/app/main/services/location.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  formGroup!: FormGroup;
  errorMessage!: string;
  locationId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.locationId = +id;
    }
  }

  ngOnInit(): void {
    if (!this.locationId) {
      this.buildForm({ name: '', imgUrl: '', mapLink: '' });
    } else {
      this.locationService.getLocationById$(this.locationId).subscribe({
        next: (location: Location) => {
          this.buildForm(location);
        }
      })
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.locationService.saveLocation$(this.formGroup.value).pipe(take(1)).subscribe({
        next: (() => {
          this.router.navigate(['/locations']);
        }),
        error: (resp: HttpErrorResponse) => {
          this.errorMessage = resp.error;
          console.log(this.errorMessage);
        }
      });
    }
  }

  private buildForm(location: Location): void {
    this.formGroup = this.fb.group({
      name: [location.name, [
        Validators.required,
      ]],
      imgUrl: [location.imgUrl, [
        Validators.pattern(/^https:\/\//g)
      ]],
      mapLink: [location.mapLink, [
        Validators.pattern(/^https:\/\/www\.google\.com\/maps\/place\//g)
      ]],
      id: location.id
    });
  }
}

