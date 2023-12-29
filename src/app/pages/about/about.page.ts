import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  backgroundImage: string;

  constructor(private platform: Platform) {}

  ngOnInit() {

    this.backgroundImage = this.platform.is('desktop')
      ? './../../../assets/imgs/wip.jpg'
      : './../../../assets/imgs/wip-m.jpg';

  }

}
