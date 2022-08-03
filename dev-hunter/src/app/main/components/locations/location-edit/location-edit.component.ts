import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private locationService: LocationService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
      imgUrl: ['', [
        Validators.pattern(/^\.\.\/\.\.\/\.\.\/assets\/images\//g)
      ]],
      mapLink: ['', [
        Validators.pattern(/^https:\/\/www\.google\.com\/maps\/place\//g)
      ]]
    });
  }

  onSubmit(): void{
    const name = this.formGroup.get('name');
    const imgUrl = this.formGroup.get('imgUrl');
    const mapLink = this.formGroup.get('mapLink');
    

    if (this.formGroup.valid) {

      const location: Location = {
        name: name!.value,
        imgUrl: imgUrl!.value,
        mapLink: mapLink!.value
      }

      this.locationService.createLocation$(location).pipe(take(1)).subscribe({
        next: ((resp: Location) => {
          if (resp) {
            this.router.navigate(['/locations']);
          }
        }),
        error: (resp: HttpErrorResponse) => {
          this.errorMessage = resp.error;
          // this.dialog.open(ModalComponent, { data: this.errorMessage });
          console.log(this.errorMessage);
          
        }
      });
    }
  }
  }

