import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Developer } from 'src/app/main/interfaces/developer.interface';
import { Location } from 'src/app/main/interfaces/location.interface';
import { Technology } from 'src/app/main/interfaces/technology.interface';
import { DeveloperService } from 'src/app/main/services/developer.service';
import { LocationService } from 'src/app/main/services/location.service';
import { TechnologyService } from 'src/app/main/services/technology.service';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-developer-edit',
  templateUrl: './developer-edit.component.html',
  styleUrls: ['./developer-edit.component.css']
})
export class DeveloperEditComponent implements OnInit {

  formGroup!: FormGroup;
  developerId!: number;
  locations!: Location[];
  location!: string;
  technologies!: Technology[];
  technology!: string;
  languages: string[] = ['Bulgarian', 'English', 'Serbian'];
  language!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private developerService: DeveloperService,
    private locationService: LocationService,
    private technologyService: TechnologyService,
    private dialog: MatDialog
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.developerId = +id;
    }
  }

  ngOnInit(): void {
    
    if (!this.developerId) {
      this.buildForm({
        name: '',
        email: '',
        phoneNumber: '',
        locationId: 0,
        technologyId: 0,
        pricePerHour: '',
        experience: '',
        language: '',
        description: '',
        imgUrl: '',
        linkedIn: '',
      });
    } else {
      this.developerService.getDeveloperById$(this.developerId).pipe(take(1)).subscribe({
        next: (developer: Developer) => {
          this.buildForm(developer);
        }
      })
    }

    this.locationService.getAllLocations$().pipe(take(1)).subscribe({
      next: ((resp: Location[]) => {
        this.locations = resp;
      })
    });

    this.technologyService.getAllTechnologies$().pipe(take(1)).subscribe({
      next: ((resp: Technology[]) => {
        this.technologies = resp;
      })
    });

  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.developerService.saveDeveloper$(this.formGroup.value).pipe(take(1)).subscribe({
        next: (() => {
          this.router.navigate(['/developers']);
        }),
        error: (resp: HttpErrorResponse) => {
          this.dialog.open(ModalComponent, {
            data: resp.message
          });
        }
      });
    }
  }

  private buildForm(developer: Developer): void {
    this.formGroup = this.fb.group({
      name: [developer.name, [
        Validators.required,
      ]],
      email: [developer.email, [
        Validators.required,
        Validators.email
      ]],
      phoneNumber: [developer.phoneNumber, [
        Validators.required,
        Validators.pattern(/^\+[0-9]*$/g),
        Validators.minLength(10)
      ]],
      locationId: [developer.locationId, [
        Validators.required
      ]],
      technologyId: [developer.technologyId, [
        Validators.required
      ]],
      pricePerHour: [developer.pricePerHour, [
        Validators.required,
        Validators.pattern(/^[0-9]*$/g)
      ]],
      experience: [developer.experience, [
        Validators.required,
        Validators.pattern(/^[0-9]*$/g)
      ]],
      language: [developer.language, [
        Validators.required,
      ]],
      description: [developer.description, [
        Validators.minLength(20)
      ]],
      imgUrl: [developer.imgUrl],
      linkedIn: [developer.linkedIn, [
        Validators.pattern(/^https:\/\/www\.linkedin\.com\/in\//g)
      ]],
      id: developer.id
    });
  }
}
