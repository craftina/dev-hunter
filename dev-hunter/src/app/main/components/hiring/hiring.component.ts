import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { Hiring } from '../../interfaces/hiring.interface';
import { HiringService } from '../../services/hiring.service';

@Component({
  selector: 'app-hiring',
  templateUrl: './hiring.component.html',
  styleUrls: ['./hiring.component.css']
})
export class HiringComponent implements OnInit {

  hirings!: Hiring[];
  loading: boolean = true;

  constructor(
    private hiringService: HiringService,
    // private router: Router,
    // private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.hiringService.getAllHirings$()
      .pipe(
        finalize(() => this.loading = false),
        take(1)
      ).subscribe({
        next: ((resp: Hiring[]) => {
          this.hirings = resp;
        })
      })
  }

}
