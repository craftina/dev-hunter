import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
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
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.developerService.getAllDevelopers$().pipe(take(1)).subscribe({
      next: ((resp: Developer[]) => {
        this.loading = false;
        this.developers = resp;
      })
    })
  }

 

}
