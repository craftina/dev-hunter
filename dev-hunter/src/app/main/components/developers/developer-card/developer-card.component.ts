import { Component, Input, OnInit } from '@angular/core';
import { Developer } from 'src/app/main/interfaces/developer.interface';

@Component({
  selector: 'app-developer-card',
  templateUrl: './developer-card.component.html',
  styleUrls: ['./developer-card.component.css']
})
export class DeveloperCardComponent implements OnInit {

  @Input() developer!: Developer;

  developerImageUrl: string = '../../../assets/images/dev-image.png';

  constructor() { }

  ngOnInit(): void {
  }

}
