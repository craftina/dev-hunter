import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { Developer } from '../../interfaces/developer.interface';
import { DeveloperService } from '../../services/developer.service';
import { LocationService } from '../../services/location.service';
import { TechnologyService } from '../../services/technology.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {

  formGroup!: FormGroup;
  loading: boolean = true;
  developers!: Developer[];
  filteredDevelopers!: Developer[];
  locations!: string[];
  technologies!: string[];
  options!: string[] | null;


  information: { value: string, name: string }[] = [
    { value: 'location', name: 'Location' },
    { value: 'technology', name: 'Technology' },
    { value: 'all', name: 'All Developers' },
  ];

  constructor(
    private developerService: DeveloperService,
    private locationService: LocationService,
    private technologyService: TechnologyService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      option: '',
      value: ''
    });

    this.formGroup.get('option')!.valueChanges.subscribe((change) => {
      this.formGroup
        .get('option')!
        .setValue(this.choosingOption(change), { emitEvent: false });
    });

    this.developerService.getAllDevelopers$()
      .pipe(
        finalize(() => this.loading = false),
        take(1)
      ).subscribe({
        next: ((resp: Developer[]) => {
          this.developers = resp;
          this.filteredDevelopers = resp;
        })
      });

    this.locationService.getAllLocations$().pipe(take(1)).subscribe({
      next: ((resp) => {
        this.locations = resp.map(l => l.name);
      })
    })

    this.technologyService.getAllTechnologies$().pipe(take(1)).subscribe({
      next: ((resp) => {
        this.technologies = resp.map(t => t.name);
      })
    })
  }


  onSubmitSearch(): void {
    const option = this.formGroup.get('option');
    const value = this.formGroup.get('value')

    if (this.formGroup.valid) {
      if (option!.value === 'all' || null) {
        this.filteredDevelopers = this.developers;
      } else {
        this.filteredDevelopers = this.developers.filter(d => {
          if (option!.value === 'location' && d.location!.name === value?.value) {
            return d;
          } else if (option!.value === 'technology' && d.technology!.name === value?.value) {
            return d;
          } else {
            return null;
          }
        });
      }
    }
  }

  choosingOption(option: string): string {
    switch (option) {
      case 'location': this.options = this.locations;
        break;
      case 'technology': this.options = this.technologies;
        break;
      default: this.options = null;
        break;
    }
    return option;
  }
}
