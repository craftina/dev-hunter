import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize, take } from 'rxjs';
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
          this.hirings = resp.filter((h) => h.completed == false);
        })
      })
  }

  onCheck(selected: { hiring: Hiring, checked: boolean }): void {
    const isAdded = this.selectedForHiring.includes(selected.hiring);
    const selectedHiring = Object.assign({}, selected.hiring);
    delete selectedHiring.developer;

    if (selected.checked == true && isAdded == false) {
      this.selectedForHiring.push(selectedHiring);
    } else if (selected.checked == false && isAdded == true) {
      this.selectedForHiring = this.selectedForHiring.filter(h => h.id !== selectedHiring.id);
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
      let dialogRef = this.dialog.open(HiringDialogComponent);

      dialogRef.componentInstance.hired.subscribe(
        (resp) => {
          this.selectedForHiring.forEach(h => {
            h.startDate = resp.startDate;
            h.endDate = resp.endDate;
            h.completed = true;
            this.hiringService.editHiring$(h).pipe(take(1)).subscribe();
          });
          this.hirings = this.hirings.filter(h => h.completed == false);
        }
      )
    }
  }
}
