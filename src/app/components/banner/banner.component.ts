import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicSlides } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],

  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BannerComponent  implements OnInit {

  isDesktop : boolean = false;
  isMobile : boolean = true;


  @Input() slides: any[] = [];
  swiperModules = [IonicSlides];
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  constructor(private platform: Platform ) {
    if (this.platform.is('desktop')) {
      this.isDesktop = true;
      this.isMobile = false;
      console.log("this is desktop");
    }
  }

  ngOnInit() {}

  onSlideChange(event: any) {
    // console.log(this.swiperRef?.nativeElement.swiper.activeIndex);
    // console.log('event', event);
  }



}
