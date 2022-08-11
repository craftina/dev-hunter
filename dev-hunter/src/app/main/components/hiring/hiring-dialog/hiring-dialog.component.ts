import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hiring } from 'src/app/main/interfaces/hiring.interface';

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

  onClickHire(): void {
    this.hired.emit({ startDate: this.startDate.value, endDate: this.endDate.value });
  }
}
