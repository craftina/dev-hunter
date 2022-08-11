import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hiring } from 'src/app/main/interfaces/hiring.interface';

@Component({
  selector: 'app-hiring-card',
  templateUrl: './hiring-card.component.html',
  styleUrls: ['./hiring-card.component.css']
})
export class HiringCardComponent {

  @Input() hiring!: Hiring;

  @Output() selected = new EventEmitter<{ hiring: Hiring, checked: boolean }>();
  @Output() removed = new EventEmitter<Hiring>();

  checked: boolean = false;
  developerImageUrl: string = '../../../assets/images/developer-image.png';

  onChangeCheck(): void {
    this.selected.emit({ hiring: this.hiring, checked: this.checked });
  }

  onRemoveClick(): void {
    this.removed.emit(this.hiring);
  }
}
