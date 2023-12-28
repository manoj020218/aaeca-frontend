import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';
// import { JwtService } from 'src/app/services/jwt.service';
// import { StorageService } from 'src/app/services/storage.service';

import { EmailverificationService } from 'src/app/services/emailverification.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email!: string;
  password!: string;
  isLoading: boolean = false;

  userVerified: boolean = false;
  isLoadingResults = false;
  otpsent: boolean = false;

  authForm!: FormGroup;
  isSubmitted = false;

  // url: string = "http://localhost:3000/api/v1/user/login";
  url: string = environment.SERVER + '/user/login';
  serverErrorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthGuard,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private router: Router,
    private http: HttpClient,
    private userAPI: UserService,
    private emailVerifyAPI: EmailverificationService
  ) // private jwtService:JwtService,
  // private storageService :StorageService, // for local storage
  // private _ngZone: NgZone,
  {}

  ngOnInit() {
    this.authForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  signIn() {
    this.isSubmitted = true;
    if (this.authForm.invalid) {
      return;
    }
    // this.authService.signIn(this.authForm.value);
    // console.log(this.authForm.value);
    this.login(this.authForm.value);
    // this.router.navigateByUrl('/home');
  }

  async login(credentials: any) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.isLoading = true;
    // credentials = {
    //   email: this.email,
    //   password: this.password,
    // }
    let _email = this.authForm.value.email;
    // dont send password from here , use JWT enoding and decode at back end so that password remain safe 
    // even in credential submission 
    this.http.post(this.url, credentials).subscribe({
      next: (res) => {
        this.userAPI.setToken(res['token']); // to store locally token
        this.isLoading = false;
        localStorage.setItem('User', JSON.stringify(res)); // trick use to transfer login user data to home page by get and set method
        // this.authService.signIn(this.authForm.value);
        this.router.navigateByUrl('/home', { replaceUrl: true }); // url is replaces so that use cant go back to login page without logout
        //also set isLoggedin true so that AuthGuard can activate guard control pages.
        
      },
      error: (error) => {
        this.serverErrorMessage = error.error;
        this.isLoading = false;
        // based on server error message decide if email exit not verified .. so send message from server 
        this.emailExistButNotVerified(_email);
        // check if email already exist or not ? if not exist redirect to signup page by showing alert
        console.log(error.error);
        // this.verifyEmailSignup();
        this.presentAlert('Login Failed', error.error, 'try again');
      },
    });

    // console.log(credentials);
    await loading.dismiss();
  }



//check if email exist or not
emailExistButNotVerified(email_){
  this.userAPI.getUserbyEmail(email_).subscribe({
    next:res=>{
      //email exist but not verified 
      // shot email verified input alert , first send verification code and then take input
      console.log(res);
      if(!res.verified){
          // show alert Please wait User verification is Pending contact admin @7891234598
      }
    },
    error:error=>{
      console.log(error.error);
      // No user Found ,, make alert Kindly fill the member Join form . give link of join member page
    }
  });
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

joinnow(){
  this.router.navigateByUrl('/membership/memberform', { replaceUrl: true });
}

}
