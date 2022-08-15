import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hiring } from 'src/app/main/interfaces/hiring.interface';

@Component({
  selector: 'app-hired-card',
  templateUrl: './hired-card.component.html',
  styleUrls: ['./hired-card.component.css']
})
export class HiredCardComponent {

  @Input() hiredDeveloper!: Hiring;

  @Output() deleted = new EventEmitter<Hiring>();

  developerImageUrl: string = '../../../assets/images/dev-image.png';

  onClickDelete(): void {
    this.deleted.emit(this.hiredDeveloper);
  }
}
