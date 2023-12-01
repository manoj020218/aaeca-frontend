import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {
  show = true;

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

  addMember(){
    console.log('add member');
  }


}
