import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
//camera and file system both together to handle image
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
//***// */

import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AlertController,LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Award } from 'src/app/models/award';
// animation from right to left for modal open 
import { AnimationController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';

import { MemberService } from 'src/app/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { AwardService } from 'src/app/services/award.service';


@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.page.html',
  styleUrls: ['./addjob.page.scss'],
})
export class AddjobPage implements OnInit {

  myForm!: FormGroup;
  selectedImage: any;
  loggedMemberid:any;

  constructor(
    private formBuilder: FormBuilder,
    public router :Router,
    public route :ActivatedRoute,
    public memberApi:AwardService,
    // public userApi: UserService,    
    private alertCtrl: AlertController,     
    private toastCtrl: ToastController,
    // private navCtrl: NavController,
    private cd: ChangeDetectorRef,
    private plt: Platform,
  ) { }


  ngOnInit() {
    this.awardForm();
  }

  awardForm(){
    this.myForm = this.formBuilder.group({
      // Define your form controls and their validation rules
      title: ['', [Validators.required, Validators.minLength(3)]],
      url: [''],
      content: ['', [Validators.required, Validators.minLength(3)]],
      memberId: [this.loggedMemberid],
      last_dt: [this.futureDate(7)],
      
    });
  }

  futureDate(days:any) {
    // Get the current date and time
    const currentDate = new Date();
    // Add 7 days to the current date
    const futureDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
    return futureDate;
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  checkPlatformforWeb(){
    if(Capacitor.getPlatform()=='web' || Capacitor.getPlatform()=='ios') return true;
    return false;
  }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      source: CameraSource.Prompt, // allow option to choose from galary or camera
      width:400,
      // resultType: CameraResultType.Base64, // Use Base64 for simplicity
      resultType: this.checkPlatformforWeb() ? CameraResultType.DataUrl : CameraResultType.Uri, // f0r PWA
    });
    // Use the image data as needed
    console.log("image", image.dataUrl);
     var imageUrl = image.webPath;
    this.selectedImage = image.dataUrl;
  };

  showImage(){
    if(this.checkPlatformforWeb()) this.selectedImage.webPath = this.selectedImage.dataUrl;

    // to show image on html page use <img [src]=selectedImage?.webPath />
  }

  onSubmit() {
    // console.log(this.myForm.value);
    // transfer formbilder data to formData
    const formData = new FormData();
      Object.entries(this.myForm.value).forEach(
        ([key, value]: any[]) => {
          formData.set(key, value);
        }
  //submit the form using formDat
  )
  
  if(this.myForm.valid){
     // Convert base64 image to Blob
     const blob = this.dataURItoBlob(this.selectedImage);
     formData.append('image_path', blob, 'image.png');
    // Form is valid, handle the submission logic
    console.log('Form submitted:', this.myForm.value);
    this.memberApi.add(formData).subscribe({
      next:res=>{
        console.log(res);
        // show aler
        this.presentAlert('Thank You','Data Sent Successfully','We will Verify and Updata Data to DB');
        this.router.navigate(['/awards'],{replaceUrl:true});
      },
      error:err=>{
        console.log(err);
      }
    })
 
  }

  }

  cancel() {
    this.router.navigate(['/awards'],{replaceUrl:true});    
  }

  confirm() {    
    this.router.navigate(['/home'],{replaceUrl:true});  
  }

  async presentAlert(header:string,subheader:string, message:string) {
    const alert = await this.alertCtrl.create({
      header:header,
      subHeader: subheader,
      message:message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  BacktoDirectory(){
    this.router.navigate(['/membership/directory'],{replaceUrl:true});
  }


    // Function to convert data URI to Blob
    private dataURItoBlob(dataURI: string): Blob {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
  
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
  
      return new Blob([arrayBuffer], { type: mimeString });
    }

}
