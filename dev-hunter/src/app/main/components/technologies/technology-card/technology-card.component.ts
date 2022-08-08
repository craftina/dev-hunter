import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Technology } from 'src/app/main/interfaces/technology.interface';

@Component({
  selector: 'app-technology-card',
  templateUrl: './technology-card.component.html',
  styleUrls: ['./technology-card.component.css']
})
export class TechnologyCardComponent {

  @Input() technology!: Technology;

  @Output() deleted = new EventEmitter<Technology>();
  @Output() edited = new EventEmitter<Technology>();
  
  technologyImageUrl: string = '../../../assets/images/technology-image.png';

  onClickEdit(): void {
    this.edited.emit(this.technology);
  }

  onClickDelete(): void {
    this.deleted.emit(this.technology);
  }
}
