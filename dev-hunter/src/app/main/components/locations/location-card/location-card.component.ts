import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from 'src/app/main/interfaces/location.interface';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent {

  @Input() location!: Location;

  @Output() onDeleteEvent = new EventEmitter<Location>();
  @Output() onEditEvent = new EventEmitter<Location>();
  
  locationImageUrl: string = '../../../assets/images/location-image.png';

  onClickEdit(): void {
    this.onEditEvent.emit(this.location);
  }

  onClickDelete(): void {
    this.onDeleteEvent.emit(this.location);
  }
}
