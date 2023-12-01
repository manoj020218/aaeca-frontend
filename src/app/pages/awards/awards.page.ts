import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.page.html',
  styleUrls: ['./awards.page.scss'],
})
export class AwardsPage implements OnInit {
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
  

  addAward(){
    console.log('add award');
  }
}
