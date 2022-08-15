import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hiring-dialog',
  templateUrl: './hiring-dialog.component.html',
  styleUrls: ['./hiring-dialog.component.css']
})
export class HiringDialogComponent {

  @Output() hired = new EventEmitter<{ startDate: Date, endDate: Date }>();

  todayDate = new Date();
  startDate = new FormControl();
  endDate = new FormControl();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { start: Date, end: Date },
  ) { }

  dateFilter = (date: Date | null): boolean => {
    const startDateRange = new Date(this.data.start);
    const endDateRange = new Date(this.data.end);
    if (date! >= startDateRange && date! <= endDateRange) {
      return false;
    }
    return true;
  }

  onClickHire(): void {
    this.hired.emit({ startDate: this.startDate.value, endDate: this.endDate.value });
  }
}
