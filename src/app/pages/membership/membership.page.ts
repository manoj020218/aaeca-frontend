import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Camera, CameraResultType } from '@capacitor/camera';

import { AlertController,LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Member } from './../../models/member';
// animation from right to left for modal open 
import { AnimationController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';

import { MemberService } from 'src/app/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  myForm!: FormGroup;

  //shoot and upload photo both option
  // use form data in modal
  // on page write about membership banefit only and 
  //bottom give button "i am in"
  //use payment gateway to collect money 
  //
  
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
    this.membershipForm();
  }

  membershipForm(){
    this.myForm = this.formBuilder.group({
      // Define your form controls and their validation rules
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      middle_name: [''],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      roll_number: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern('^[0-9]*$')]],
      whatsapp_number: ['', [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern('^[0-9]*$')]],
      degree_name: ['', [Validators.required, Validators.minLength(3)]],
      passout_year: ['', [Validators.required, Validators.minLength(4)]],
      gender: ['', [Validators.required, Validators.minLength(3)]],
      linkedin: [''],
      xhandle: [''],
      employer: ['', [Validators.required, Validators.minLength(3)]],
      designation: ['', [Validators.required, Validators.minLength(3)]],
      official_email: ['', [Validators.required,
        // Validators.toLowerCase(),
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]],
      email: ['', [Validators.required,
        // Validators.toLowerCase(),
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]],
      current_city: ['', [Validators.required, Validators.minLength(3)]],
      current_country: ['', [Validators.required, Validators.minLength(3)]],
      current_pincode: ['', [Validators.required, Validators.minLength(3)]],
      current_address: ['', [Validators.required,Validators.minLength(5),
        Validators.maxLength(200),]],
      image: [''],
      tc_1: ['', [Validators.required]],
      tc_2: ['', [Validators.required]],

    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  // async takePicture() {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     resultType: CameraResultType.Base64, // Use Base64 for simplicity
  //     source: CameraSource.Camera, // Use Camera as the image source
  //   });

  //   // Use the image data as needed
  //   console.log(image.base64Data);
  // }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64, // Use Base64 for simplicity
      // resultType: CameraResultType.Uri
    });

    // Use the image data as needed
    console.log(image.path);
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
  };
  
  onSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      // Form is valid, handle the submission logic
      console.log('Form submitted:', this.myForm.value);
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.onSubmit();
    this.modal.dismiss(this.name, 'confirm');
  
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
