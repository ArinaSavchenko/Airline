import {Component, OnInit, OnDestroy} from '@angular/core';
import {trigger, transition, style, animate} from '@angular/animations';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({opacity: 0}),
        animate('800ms', style({opacity: 1}))
      ]),
      transition('* => void', [
        animate('800ms', style({opacity: 0}))
      ])
    ])
  ]
})

export class CarouselComponent implements OnInit, OnDestroy {

  public images = [
    { src: 'assets/1.png' },
    { src: 'assets/2.png' },
    { src: 'assets/4.png' },
    { src: 'assets/3.png' }
  ];

  currentSlide = 0;
  interval: any;

  public onNextClick(): void {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.images.length ? 0 : next;
    this.cancelUpdate();
  }

  private updateSlide(): void {
    this.interval = setInterval(() => {
      this.onNextClick();
    }, 5000);
  }

  private cancelUpdate(): void {
    clearInterval(this.interval);
    this.updateSlide();
  }

  ngOnInit(): void {
    this.updateSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
