import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  
  show: boolean;
  constructor() { }

  ngOnInit() {
  }

  hide() {
    this.show = !this.show;
    console.log(this.show);
  }

  share() {
    console.log('check');
  }

}
