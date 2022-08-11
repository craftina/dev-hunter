import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { Developer } from 'src/app/main/interfaces/developer.interface';
import { Hiring } from 'src/app/main/interfaces/hiring.interface';
import { DeveloperService } from 'src/app/main/services/developer.service';
import { HiringService } from 'src/app/main/services/hiring.service';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-developer-profile',
  templateUrl: './developer-profile.component.html',
  styleUrls: ['./developer-profile.component.css']
})
export class DeveloperProfileComponent implements OnInit {

  developer!: Developer;
  developerId!: number;
  loading: boolean = true;

  developerImageUrl: string = '../../../assets/images/dev-image.png';

  constructor(
    private developerService: DeveloperService,
    private hiringService: HiringService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.developerId = +id;
    }
  }

  ngOnInit(): void {
    this.developerService.getDeveloperById$(this.developerId)
      .pipe(
        finalize(() => this.loading = false),
        take(1)
      ).subscribe({
        next: ((resp: Developer) => {
          this.developer = resp;
        })
      })
  }

  onClickEdit(): void {
    this.router.navigate(['developers', this.developerId, 'edit'])
  }

  onClickDelete(): void {
    if (this.developer.hirings!.length > 0) {
      const textInfo = this.developer.hirings![0].completed ? 'hired' : 'selected for hiring';
      this.dialog.open(ModalComponent, {
        data: `This developer is already ${textInfo}!`
      })
    } else {
      this.developerService.deleteDeveloper$(this.developerId).pipe(take(1)).subscribe({
        next: (() => {
          this.router.navigate(['developers']);
        })
      })
    }
  }

  onClickSelect(): void {
    if (this.developer.hirings!.length > 0) {
      const textInfo = this.developer.hirings![0].completed ? 'hired' : 'selected for hiring';
      this.dialog.open(ModalComponent, {
        data: `This developer is already ${textInfo}!`
      })
    } else {
      const hiring: Hiring = {
        developerId: this.developerId,
        completed: false,
      }
      this.hiringService.createHiring$(hiring).pipe(take(1)).subscribe({
        next: (() => {
          this.router.navigate(['developers']);
        })
      })
    }
  }
}
