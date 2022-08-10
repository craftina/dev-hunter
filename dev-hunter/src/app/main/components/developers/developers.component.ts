import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { Developer } from '../../interfaces/developer.interface';
import { DeveloperService } from '../../services/developer.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {

  developers!: Developer[];
  loading: boolean = true;

  constructor(
    private developerService: DeveloperService,
  ) { }

  ngOnInit(): void {
    this.developerService.getAllDevelopers$()
      .pipe(
        finalize(() => this.loading = false),
        take(1)
      ).subscribe({
        next: ((resp: Developer[]) => {
          this.developers = resp;
        })
      })
  }
}
