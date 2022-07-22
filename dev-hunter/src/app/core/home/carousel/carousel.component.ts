import { Input, Component, OnInit } from '@angular/core';
import {  } from '@angular/core';
import { trigger, transition, style, animate, state } from "@angular/animations";


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

  @Input() slides: any;

  currentSlide: number = 1;
  isNext: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous == 0 ? this.slides.length : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
    this.isNext = false;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next > this.slides.length ? 1 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
    this.isNext = true;
  }


}
