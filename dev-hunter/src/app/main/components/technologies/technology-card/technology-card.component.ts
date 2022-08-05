import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Technology } from 'src/app/main/interfaces/technology.interface';

@Component({
  selector: 'app-technology-card',
  templateUrl: './technology-card.component.html',
  styleUrls: ['./technology-card.component.css']
})
export class TechnologyCardComponent {

  @Input() technology!: Technology;

  @Output() onDeleteEvent = new EventEmitter<Technology>();
  @Output() onEditEvent = new EventEmitter<Technology>();
  
  technologyImageUrl: string = '../../../assets/images/technology-image.png';

  onClickEdit(): void {
    this.onEditEvent.emit(this.technology);
  }

  onClickDelete(): void {
    this.onDeleteEvent.emit(this.technology);
  }
}
