import { Component, OnInit } from '@angular/core';
import { StorageService } from '../auth/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser: boolean = false;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.storageSubject.subscribe((user) => {
      if (user == null) {
        this.loggedUser = false;
      } else {
        this.loggedUser = true;
      }
    })
  }

  onLogout(): void {
    this.storageService.clearUser();
    window.location.href = 'home';
  }

}
