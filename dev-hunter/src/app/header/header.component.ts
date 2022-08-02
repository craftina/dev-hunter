import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StorageService } from '../auth/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  loggedUser: boolean = false;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService
      .getAccessTokenSubject$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: string) => {
        if (token == null) {
          this.loggedUser = false;
        } else {
          this.loggedUser = true;
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
  onLogout(): void {
    this.storageService.removeAccessToken();
    window.location.href = 'home';
  }
}
