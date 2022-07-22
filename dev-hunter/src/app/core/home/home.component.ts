import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public slides = [
    { 1: 'WELCOME TO DEV HUNTER' },
    { 2: 'THE BIGGEST PLATFORM FOR HIRING DEVELOPERS' },
    { 3: 'SOCIAL MEDIA' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
