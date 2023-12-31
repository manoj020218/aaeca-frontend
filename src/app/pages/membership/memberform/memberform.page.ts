import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { Member } from 'src/app/models/member';
// animation from right to left for modal open 
import { AnimationController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';

import { MemberService } from 'src/app/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
	name: string;
	path: string;
	data: string;
}

//for geolocation
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-memberform',
  templateUrl: './memberform.page.html',
  styleUrls: ['./memberform.page.scss'],
})
export class MemberformPage implements OnInit {
   
  myForm!: FormGroup;
  selectedImage: any;

  images: LocalFile[] = [];

  genders: string[] = ['Male', 'Female', 'Not to Say'];
  selectedGender: string;

  degrees: string[]=['B.E.','B.Tech','M.Tech','MCA','MBA'];
  selectedDegree:string;

  categories: string[]=['academy', 'enterpreneure', 'government','industrial','politics','renunciate','unemployed'];
  selectedCategory:string;


  current_lattitude: number;
  current_longitude: number;
  lat: any;
  long: any;

  first_batch:any="2000";
  start_Value:any ="2010";
  pass_year: any;

  

  constructor(    
    private formBuilder: FormBuilder,
    private animationCtrl: AnimationController, // for animation control 
    private loadingCtrl: LoadingController,
    public router :Router,
    public route :ActivatedRoute,
    public memberApi:MemberService,
    // public userApi: UserService,    
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    // private navCtrl: NavController,
    private cd: ChangeDetectorRef,
    private plt: Platform,
   
  ) {
    this.lat = localStorage.getItem('my_lat');
    this.long = localStorage.getItem('my_long');
   }



  ngOnInit() {
    this.membershipForm();
    this.printCurrentPosition();
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
        Validators.maxLength(15),
        Validators.pattern('^[0-9+]*$')]],
      whatsapp_number: ['', [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.pattern('^[0-9+]*$')]],
      degree_name: ['B.Tech', [Validators.required, Validators.minLength(3)]],
      passout_year: [this.start_Value,[Validators.required, Validators.minLength(3)]],
      gender: ['Male', [Validators.required, Validators.minLength(3)]],
      linkedin: [''],
      xhandle: [''],
      employer: ['', [Validators.required, Validators.minLength(3)]],
      designation: ['', [Validators.required, Validators.minLength(3)]],
      official_email: [''],
      email: ['', [Validators.required,
        // Validators.toLowerCase(),
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]],
      current_city: [''],
      current_country: [''],
      current_pincode: [''],
      current_address: [''],
      category:['industrial',[Validators.required]],
      current_lat:[this.lat],
      current_long:[this.long],
      // image: [''],
      tc_1: [false],
      tc_2: [false],

    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  onCheckboxChangeTC1(event: any): void {
    const isChecked = event.detail.checked;
    this.myForm.patchValue({
      tc_1: isChecked,
    });
  }

  onCheckboxChangeTC2(event: any): void {
    const isChecked = event.detail.checked;
    this.myForm.patchValue({
      tc_2: isChecked,
    });
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
    
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    this.selectedImage = image.dataUrl;
    // this.myForm.patchValue({'image':this.selectedImage})
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
  };

  showImage(){
    if(this.checkPlatformforWeb()) this.selectedImage.webPath = this.selectedImage.dataUrl;

    // to show image on html page use <img [src]=selectedImage?.webPath />
  }

  //https://capacitorjs.com/docs/apis/share take help of this to share 
  async share(){
    await Share.share({
      title: 'Share via Whatsapp',
      text: 'Sharing an Image',
      url: this.selectedImage.path,
      dialogTitle: 'Share with whatsapp',
    });

  }

  

  checkConditions(){
    if(this.myForm.valid ){
       
    }
  }
  
  onSubmit() {
    //get data from locla storage and patch to form
    this.lat = localStorage.getItem('my_lat');
    this.long = localStorage.getItem('my_long');

    this.myForm.patchValue({
      current_lat : this.lat,
      current_long: this.long
    })
    
    // transfer formbilder data to formData
    const formData = new FormData();
      Object.entries(this.myForm.value).forEach(
        ([key, value]: any[]) => {
          formData.set(key, value);
        }
  //submit the form using formDat
  )
  
  if(!this.myForm.get('tc_1').value && !this.myForm.get('tc_2') ) {
      // console.log("t&c not accepted");
      this.presentAlert ('!Alert','T & C not accepted.','Kindly accept conditions.');
  } else if(this.myForm.valid && this.myForm.get('tc_1').value && this.myForm.get('tc_2')){
     // Convert base64 image to Blob
     const blob = this.dataURItoBlob(this.selectedImage);
     formData.append('image_path', blob, 'image.png');
    // Form is valid, handle the submission logic
    // console.log('Form submitted:', this.myForm.value);
    this.memberApi.addMember(formData).subscribe({
      next:res=>{
        // console.log(res);
        // show aler
        this.presentAlert('Thank You','Data Sent Successfully','We will Verify and Update Data to DB');
        // this.router.navigate(['/membership/directory'],{replaceUrl:true}); //only show this is user is logged in
        this.router.navigate(['/home'],{replaceUrl:true});


      },
      error:error=>{
        console.log(error);
        this.presentToast(error);
      }
    })
 
  }

  }

  cancel() {
    // this.modal.dismiss(null, 'cancel');
    this.router.navigate(['/membership'],{replaceUrl:true});    
  }

  confirm() {
    // this.onSubmit();
    this.router.navigate(['/membership/directory'],{replaceUrl:true});
    // this.modal.dismiss(this.name, 'confirm');
  
  }


  async presentAlert(header:string,subheader:string, message:string) {
    const alert = await this.alertCtrl.create({
      header:header,
      subHeader: subheader,
      message:message,
      buttons: ['OK'],
    });
    await alert.present();
    // Automatically dismiss the alert after 5 seconds
    setTimeout(() => {
      alert.dismiss();
    }, 5000);
  
  }

  BacktoDirectory(){
    this.router.navigate(['/membership/directory'],{replaceUrl:true});
  }


  async printCurrentPosition(){
    const coordinates = await Geolocation.getCurrentPosition();
    this.current_lattitude = coordinates.coords.latitude;
    this.current_longitude = coordinates.coords.longitude;
  
    console.log('Current position:', coordinates);
  };
  


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


 
//little helper
// Little helper
async presentToast(text) {
  const toast = await this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'bottom',
    color: 'dark', // Set the desired background color
  });
  toast.present();
}

async Pass_year(event){
  console.log(event.detail.value);
  // this.pass_year = this.start_Value;
  this.pass_year = event.detail.value;
  this.myForm.patchValue({
    passout_year : this.pass_year
  })
}

}
