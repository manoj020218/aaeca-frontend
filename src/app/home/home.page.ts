import { style, transition, trigger, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { Browser } from '@capacitor/browser';
// register Swiper custom elements
register();

import { BannerService } from '../services/banner.service';
import { environment } from 'src/environments/environment.prod';

//home page suggestion
import {SuggestionService} from './../services/suggestion.service'
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

const baseUrl = environment.SERVER;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
  ],
})

export class HomePage {

  show = true;
  home_top_banner:any[] = [];
  myForm!: FormGroup;
  home_glimps_banner:any[] = [];

  //for location get
  current_lattitude: number;
  current_longitude: number;
  lat: any;
  long: any;

  constructor(
    private formBuilder: FormBuilder,
    private bannerApi : BannerService,
    private suggestionApi : SuggestionService,
    private alertCtrl: AlertController,
    public route :ActivatedRoute,
    public router :Router,
    private toastCtrl: ToastController,
  ) {
    this.lat = localStorage.getItem('my_lat');
    this.long = localStorage.getItem('my_long');
  }

  ngOnInit() {
    this.callBanner();
    this.queryForm();
    this.callGlimpsBanner();

    // Auto-play the slider
    setInterval(() => {
      this.nextSlide();
    }, 2000); // Adjust the interval as needed

  }

queryForm(){
  this.myForm = this.formBuilder.group({
    // Define your form controls and their validation rules
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(6)]],
    current_lat:[this.lat],
    current_long:[this.long],
  });
}

customCounterFormatter(inputLength: number, maxLength: number) {
  return `${maxLength - inputLength} characters remaining`;
}

onSubmit() {
    // transfer formbilder data to formData
    const formData = new FormData();
      Object.entries(this.myForm.value).forEach(
        ([key, value]: any[]) => {
          formData.set(key, value);
        }
  //submit the form using formDat
  )

  if (this.myForm.valid) {
    // Form is valid, handle the submission logic
    console.log('Form submitted:', this.myForm.value);
    this.suggestionApi.add(this.myForm.value).subscribe({
      next:res=>{
        this.presentAlert('Thank You','Received Successfully','We will Work on It');
        // this.router.navigate(['/membership/directory'],{replaceUrl:true}); //only show this is user is logged in
        this.router.navigate(['/home'],{replaceUrl:true});
      },
      error:err=>{
        this.presentToast(err);
      }
    })
  }
}


  hide() {
    this.show = !this.show;
    console.log(this.show);
  }

  share() {
    console.log('check');
  }

  shareViaFacebook(){


  }

  async shareViaInstagram(){
    await Browser.open({ url: 'https://www.instagram.com/eca_alumni?igsh=ZmpwcmN6NTg2eWRm' });
  }

  shareViaTwitter(){

  }

  sharePicker(){
    //linkedin
    // https://www.linkedin.com/groups/9292163
  }

  shareViaEmail(){

  }


  callBanner(){
    // for (let i = 0; i <5; i++) {
    //         // make array of image objects
    //         this.home_top_banner.push(
    //           {banner:`https://picsum.photos/id/${120+i}/1200/1200`}
    //         );
    //       };

    this.bannerApi.query("purpose=home_top_banner").subscribe({
      next:dat=>{
        console.log(dat)
        for (let i = 0; i <dat.length; i++) {
          // make array of image objects
          this.home_top_banner.push(
            {banner:baseUrl+'/images/'+dat[i].image_path}
          );
          console.log(baseUrl+'/images/'+dat[i].image_path);
        };
      },
      error:err=>{ console.log(err)}
    });

   }

   callGlimpsBanner(){
    for (let i = 0; i <7; i++) {
      // make array of image objects
      this.home_glimps_banner.push(
        {banner:`assets/imgs/reunion/${i}.jpg`}
      );
    };

// this.bannerApi.getImageByGymId("default_memberlist_page").subscribe({
//   next:dat=>{
//     console.log(dat)
//     for (let i = 0; i <dat.length; i++) {
//       // make array of image objects
//       this.members_slides.push(
//         {banner:this.baseUri+'/images/'+dat[i].image_path}
//       );
//     };
//   },
//   error:err=>{ console.log(err)}
// });
   }

   cards = [
    { title: 'Mr. Ramesh Kumar', subtitle:'1,00,000/-INR', content: 'Hostel Development', imageUrl: 'assets/imgs/personboy.jpg' },
    { title: 'Dr. Ashok Kumar',subtitle:'2,00,000/-INR', content: 'AI IOT reaserach project',imageUrl: 'assets/imgs/persongrl.jpg' },
    { title: 'Mr. Aashish Kumar', subtitle:'2,00,000/-INR',content: 'Sponsor a Student',imageUrl: 'assets/imgs/personmale.jpg' },
  ];


  currentIndex = 0;


  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
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

}
