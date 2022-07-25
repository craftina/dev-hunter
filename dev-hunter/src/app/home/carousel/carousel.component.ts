import { Input, Component, OnInit } from '@angular/core';
import {  } from '@angular/core';
import { trigger, transition, style, animate, state } from "@angular/animations";
import { Slide } from '../interfaces/slide.interface';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('scaleInOut', [
      transition('void => *',[
        style({ opacity: 0, transform: "scale(0.5)" }),
      animate(700,
        style({ opacity: 1, transform: "scale(1)" })
      )
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {

  @Input() slides: Slide[] | undefined;
  rowHeight!: string | number;

  currentSlide: number = 1;
  isNext: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.rowHeight = "20vh";
  }

  onPreviousClick(): void{
    const previous = this.currentSlide - 1;
    this.currentSlide = previous == 0 ? this.slides!.length : previous;
    this.isNext = false;
  }

  onNextClick(): void {
    const next = this.currentSlide + 1;
    this.currentSlide = next > this.slides!.length ? 1 : next;
    this.isNext = true;
  }


}
