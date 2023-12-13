import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  show = true;

  constructor() { }

  ngOnInit() {
  }

  handleRefresh(event) {
    setTimeout(() => {
      // this.getMembers();
      event.target.complete();
    }, 2000);
  };


  hide() {
    this.show = !this.show;
    console.log(this.show);
  }

  share() {
    console.log('check');
  }

}
