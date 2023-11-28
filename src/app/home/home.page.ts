import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  show = true;
  home_top_banner:any[] = [];
  myForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.callBanner();
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

  }

  shareViaTwitter(){

  }

  sharePicker(){

  }

  shareViaEmail(){
    
  }


  callBanner(){

    for (let i = 0; i <5; i++) {
            // make array of image objects
            this.home_top_banner.push(
              {banner:'https://picsum.photos/id/1/200/300'}
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
   
}
