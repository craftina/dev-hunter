import { Component, Input, OnInit } from '@angular/core';
import { Location } from 'src/app/main/interfaces/location.interface';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent implements OnInit {

  @Input() location!: Location;

  constructor() { }

  ngOnInit(): void {
  }

}
