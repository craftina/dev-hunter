import { Component, OnInit } from '@angular/core';
import { Slide } from './interfaces/slide.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public slides : Slide[] = [
    { id: 1,
      text: 'WELCOME TO DEV HUNTER' },
    { id: 2,
      text: 'THE BIGGEST PLATFORM FOR HIRING DEVELOPERS' },
    { id: 3,
      text: 'SOCIAL MEDIA' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
