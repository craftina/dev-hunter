import { Component, OnInit } from '@angular/core';
import { Technology } from '../../interfaces/technology.interface';
import { Developer } from '../../interfaces/developer.interface';
import { TechnologyService } from '../../services/technology.service';
import { DeveloperService } from '../../services/developer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {

  technologies!: Technology[];
  loading: boolean = true;
  developers!: Developer[];

  constructor(
    private technologyService: TechnologyService,
    private developerService: DeveloperService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.technologyService.getAllTechnologies$().pipe(take(1)).subscribe({
      next: ((resp: Technology[]) => {
        this.loading = false;
        this.technologies = resp;
      })
    })
  }

  onEdit(technology: Technology): void {
    this.router.navigate(['technologies', 'edit', technology.id]);
  }

  onDelete(technology: Technology): void {
    this.developerService.getDevelopersByTechnologyId$(technology.id!).pipe(take(1)).subscribe({
      next: ((res) => {
        this.developers = res;
        if (this.developers.length < 1) {
          this.technologyService.deleteTechnology$(technology.id!).pipe(take(1)).subscribe({
            next: (() => {
              this.technologies = this.technologies.filter(l => l.id !== technology.id);
            })
          })
        } else {
          this.dialog.open(ModalComponent, { data: "You cannot delete this location, a developer has been assigned to it." });
        }
      })
    })
  }

}
