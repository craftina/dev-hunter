import { Component, OnInit } from '@angular/core';
import { Technology } from '../../interfaces/technology.interface';
import { Developer } from '../../interfaces/developer.interface';
import { TechnologyService } from '../../services/technology.service';
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

  constructor(
    private technologyService: TechnologyService,
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
    if (technology.developers!.length < 1) {
      this.technologyService.deleteTechnology$(technology.id!).pipe(take(1)).subscribe({
        next: (() => {
          this.technologies = this.technologies.filter(l => l.id !== technology.id);
        })
      })
    } else {
      const devText = technology.developers!.length > 1 ? `${technology.developers!.length} developers` : '1 developer';
      this.dialog.open(ModalComponent, {
        data: `You cannot delete this technology, ${devText} has been assigned to it.`
      });
    }
  }
}
