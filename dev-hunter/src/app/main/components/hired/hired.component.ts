import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { Hiring } from '../../interfaces/hiring.interface';
import { HiringService } from '../../services/hiring.service';

@Component({
  selector: 'app-hired',
  templateUrl: './hired.component.html',
  styleUrls: ['./hired.component.css']
})
export class HiredComponent implements OnInit {

  loading: boolean = true;
  hiredDevelopers!: Hiring[];

  constructor(
    private hiringService: HiringService,
  ) { }

  ngOnInit(): void {
    this.hiringService.getAllHired$().pipe(
      finalize(() => this.loading = false),
      take(1)
    ).subscribe({
      next: ((resp: Hiring[]) => {
        this.hiredDevelopers = resp;
      })
    });
  }

  onDelete(hired: Hiring): void {
    this.hiringService.deleteHiring$(hired.id!).pipe(take(1)).subscribe({
      next: (() => {
        this.hiredDevelopers = this.hiredDevelopers.filter(h => h.id !== hired.id);
      })
    })
  }
}
