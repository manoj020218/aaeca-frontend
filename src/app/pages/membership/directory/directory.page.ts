import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { AlertController,LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Member } from 'src/app/models/member';
// animation from right to left for modal open 
import { AnimationController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
