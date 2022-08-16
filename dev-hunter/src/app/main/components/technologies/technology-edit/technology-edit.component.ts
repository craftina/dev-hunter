import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Technology } from 'src/app/main/interfaces/technology.interface';
import { TechnologyService } from 'src/app/main/services/technology.service';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-technology-edit',
  templateUrl: './technology-edit.component.html',
  styleUrls: ['./technology-edit.component.css']
})
export class TechnologyEditComponent implements OnInit {

  formGroup!: FormGroup;
  technologyId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private technologyService: TechnologyService,
    private dialog: MatDialog
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.technologyId = +id;
    }
  }

  ngOnInit(): void {
    if (!this.technologyId) {
      this.buildForm({ name: '', imgUrl: '' });
    } else {
      this.technologyService.getTechnologyById$(this.technologyId).pipe(take(1)).subscribe({
        next: (technology: Technology) => {
          this.buildForm(technology);
        }
      })
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.technologyService.saveTechnology$(this.formGroup.value).pipe(take(1)).subscribe({
        next: (() => {
          this.router.navigate(['/technologies']);
        }),
        error: (resp: HttpErrorResponse) => {
          this.dialog.open(ModalComponent, {
            data: resp.message
          });
        }
      });
    }
  }

  private buildForm(technology: Technology): void {
    this.formGroup = this.fb.group({
      name: [technology.name, [
        Validators.required,
      ]],
      imgUrl: [technology.imgUrl],
      id: technology.id
    });
  }

}
