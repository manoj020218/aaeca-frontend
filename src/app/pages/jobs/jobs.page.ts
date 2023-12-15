import { Component, OnInit } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { AlertController,LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
 
// animation from right to left for modal open 
import { AnimationController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { AwardService } from 'src/app/services/award.service';
import { Award } from 'src/app/models/award';


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



  addAward(){
    this.router.navigate(['/jobs/addjob'],{replaceUrl:true});  
  }
}
