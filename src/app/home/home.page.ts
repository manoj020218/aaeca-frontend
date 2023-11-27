import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  show = true;

  constructor() {}


  hide() {
    this.show = !this.show;
    console.log(this.show);
  }

  share() {
    console.log('check');
  }

  shareViaFacebook(){

  }

  shareViaInstagram(){

  }

  shareViaTwitter(){

  }

  sharePicker(){

  }

  shareViaEmail(){
    
  }

}
