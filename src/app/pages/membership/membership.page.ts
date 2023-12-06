import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { AlertController,LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Member } from './../../models/member';
// animation from right to left for modal open 
import { AnimationController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';

import { MemberService } from 'src/app/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { MemberformPage } from './memberform/memberform.page';


@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {
 
 
  constructor(
    private formBuilder: FormBuilder,
    private animationCtrl: AnimationController, // for animation control 
    public loadingController:LoadingController,
    public router :Router,
    public route :ActivatedRoute,
    public memberApi:MemberService,
    // public userApi: UserService,
    
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    // private navCtrl: NavController,
  ) {}



  ngOnInit() {
     
  }

 
  // async addMember(){
  //   const modal = await this.modalCtrl.create({
  //     component: MemberformPage,     
  //     breakpoints: [0, 0.5, 0.8],
  //     initialBreakpoint: 0.8, 
  //     showBackdrop: false,         
  //     }
  //   );  
  //   await modal.present();
  //   const { data, role } = await modal.onWillDismiss();
  //   if (role === 'confirm') {
  //     console.log(data);
  //     // this.getMembers();
  //   }  
  //   // when close model it will change the page also
  //   if(!window.history.state.modal){
  //     const modalState = {modal:true};
  //     history.pushState(modalState,null);
  //     }

  // }
  
  addMember(){
    this.router.navigate(['/membership/memberform'],{replaceUrl:true});
  }
 
 

}
