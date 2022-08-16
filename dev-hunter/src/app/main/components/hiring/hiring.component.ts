import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize, Observable, take, zip } from 'rxjs';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Hiring } from '../../interfaces/hiring.interface';
import { HiringService } from '../../services/hiring.service';
import { HiringDialogComponent } from './hiring-dialog/hiring-dialog.component';

@Component({
  selector: 'app-hiring',
  templateUrl: './hiring.component.html',
  styleUrls: ['./hiring.component.css']
})
export class HiringComponent implements OnInit {

  loading: boolean = true;
  allHirings!: Hiring[];
  hirings!: Hiring[];
  selectedForHiring: Hiring[] = [];

  constructor(
    private hiringService: HiringService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.hiringService.getAllHirings$()
      .pipe(
        finalize(() => this.loading = false),
        take(1)
      ).subscribe({
        next: ((resp: Hiring[]) => {
          this.allHirings = [...resp];
          this.hirings = resp.filter((h) => h.completed == false);
        })
      })
  }

  onCheck(selected: { hiring: Hiring, checked: boolean }): void {
    const isAdded = this.selectedForHiring.includes(selected.hiring);

    if (selected.checked == true && isAdded == false) {
      this.selectedForHiring.push(selected.hiring);
    } else if (selected.checked == false && isAdded == true) {
      this.selectedForHiring = this.selectedForHiring.filter(h => h.id !== selected.hiring.id);
    }
  }

  onRemove(hiring: Hiring): void {
    this.hiringService.deleteHiring$(hiring.id!).pipe(take(1)).subscribe({
      next: (() => {
        this.hirings = this.hirings.filter(h => h.id !== hiring.id);
      })
    })
  }

  onAddDates(): void {
    if (this.selectedForHiring.length === 0) {
      this.dialog.open(ModalComponent, {
        data: 'You have not selected developers yet!'
      })
    } else {
      let minDate;
      let maxDate;

      const selectedAndHired = this.allHirings
        .filter(h => h.completed == true)
        .filter(h => this.selectedForHiring.find((d) => d.developerId === h.developerId));

      if (selectedAndHired.length > 0) {
        minDate = selectedAndHired.reduce((d1, d2) => d1.startDate! < d2.startDate! ? d1 : d2).startDate;
        maxDate = selectedAndHired.reduce((d1, d2) => d1.endDate! > d2.endDate! ? d1 : d2).endDate;
      }
      const data = { start: minDate, end: maxDate };

      let dialogRef = this.dialog.open(HiringDialogComponent, {
        data: data
      });

      dialogRef.componentInstance.hired.pipe(take(1)).subscribe(
        (resp) => {
          this.selectedForHiring.map(h => {
            h.startDate = resp.startDate;
            h.endDate = resp.endDate;
            h.completed = true;
          })
          const edit$: Observable<Hiring[]> =
            zip(this.selectedForHiring.map(h => this.hiringService.editHiring$(h)));

          edit$.pipe(take(1)).subscribe({
            next: (() => {
              this.selectedForHiring = [];
              this.hirings = this.hirings.filter(h => h.completed == false);
            })
          })
        }
      )
    }
  }
}

