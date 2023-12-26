import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  isLoadingResults = false;

  authForm!: FormGroup;
  resetForm!: FormGroup;
  isSubmitted  =  false;
  isOTPmailed = false;
  OTPinputTouch = false;

  serverErrorMessage:string;

  constructor(
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private userApi : UserService,
    private fb: FormBuilder,
    private router:Router,
  ) { }

  ngOnInit() {

    this.authForm  =  this.fb.group({
      email: ['',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),],],
      mobile: ['', [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern('^[0-9]*$')]]
  });

  this.resetForm  =  this.fb.group({
    email: ['',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),],],
    // otp: ['',[Validators.minLength(5),
    //           Validators.maxLength(6), 
    //           Validators.required]],
    newPassword:['',[Validators.required,
                    Validators.minLength(8),]],
});

  }


  // here check if user have email id and mobile number in member DB ? 
  // if have then open new form to change new password ..
  // if dont have email + mobile number in member DB 
  // then alert "no member found , kindly contact admin "

  async verification() {
    // call loading true
    const loading = await this.loadingController.create({
      message: 'Loading....',
    });
    await loading.present();

    this.userApi.forgetPassword(this.authForm.value).subscribe({
      next:(res)=> { console.log(res);
        loading.dismiss();
        // here show div to set new password .
        this.isOTPmailed = true;
      },
      error:(error)=>{ console.log(error)
        loading.dismiss();},
    })
    
  }

  async setPassword(){
    this.isSubmitted = true;
    this.userApi.forgetPasswordReset(this.resetForm.value).subscribe({
      next:(res)=>{if(res.passwordreset){this.router.navigateByUrl('/login',{replaceUrl:true})}},
      error:(err)=>{this.serverErrorMessage = err.error},
    });
  }



}
