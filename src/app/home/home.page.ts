import { style, transition, trigger, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();


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

  constructor(
    private formBuilder: FormBuilder,
  ) {}

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
    query: ['', [Validators.required, Validators.minLength(6)]],
  });
}

customCounterFormatter(inputLength: number, maxLength: number) {
  return `${maxLength - inputLength} characters remaining`;
}

onSubmit() {
  if (this.myForm.valid) {
    // Form is valid, handle the submission logic
    console.log('Form submitted:', this.myForm.value);
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

  shareViaInstagram(){
// https://www.instagram.com/invites/contact/?i=12eltkk8yaypf&utm_content=qbso68c
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
    for (let i = 0; i <5; i++) {
            // make array of image objects
            this.home_top_banner.push(
              {banner:`https://picsum.photos/id/${120+i}/1200/1200`}
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

   
}
