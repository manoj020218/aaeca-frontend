import { Injectable } from '@angular/core';


import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Users } from '../models/user';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';




@Injectable({
  providedIn: 'root'
})

export class UserService {
  noAuthHeader = {headers: new HttpHeaders({'NoAuth':'True'})};

   // url:string= 'http://localhost:3000/api/v1'
 url:string= environment.SERVER + '/user';
  token: any;
  isAuthenicated: boolean;

  constructor(
    private http:HttpClient,
    private alertCtrl: AlertController,
    ) { }

    register(body:any): Observable<any> {
      console.log(body);
      let url = `${this.url}/user/register`;
      console.log(url);
      // return this.http.post(url,body,this.noAuthHeader).pipe(tap((dat:any)=>console.log(`Added with ID =${dat._id}`)),catchError(this.errorMgmt));
      return this.http.post(url,body).pipe(tap((dat:any)=>console.log(`Added with ID =${dat._id}`)),catchError(this.errorMgmt));

    }
  
    //google user registration 
    googleUser_Register(body:any): Observable<any> {
      console.log(body);
      let url = `${this.url}/user/googleUser_register`;
      console.log(url);
      // return this.http.post(url,body,this.noAuthHeader).pipe(tap((dat:any)=>console.log(`Added with ID =${dat._id}`)),catchError(this.errorMgmt));
      return this.http.post(url,body).pipe(tap((dat:any)=>console.log(`Added with ID =${dat._id}`)),catchError(this.errorMgmt));

    }
  
    
    login(authCredentials) {
      console.log(this.url);
      return this.http.post('this.url/user/login',authCredentials,)
      .pipe(tap((dat:any)=>console.log(`login succesfully`)),
      catchError(this.errorMgmt))
      .subscribe(res=>{
        const token = res.token;
        this.token = token;
      });
  
      // this.http.post('this.url/user/login',authCredentials,)
      // .pipe(tap((dat:any)=>console.log(`login succesfully`)),
      // catchError(this.errorMgmt))
      // .subscribe(res=>{
      //   const token = res.token;
      //   this.token = token;
      // });
    }
  
    LoginWithGoogle(credentials): Observable<any> { // credential here is JWT token 
      // const header = new HttpHeaders().set('Content-type','application/json');
      const header = new HttpHeaders({'Content-type':'application/json','Authorization':`Bearer ${JSON.stringify(credentials)}`});
      // return this.httpClient.post(this.path + "user/LoginWithGoogle",{ headers: header});
      let url = `${this.url}/user`;
      console.log(url);
        return this.http.post(url + `/LoginWithGoogle?token=${credentials}`, {headers: header})
        .pipe(tap((dat:any)=>{
          this.isAuthenicated = true;
          console.log(`google login succesfully`)}),
        catchError(this.errorMgmt));
      // console.log("from auth service",JSON.stringify(credentials));
        // return this.httpClient.post(this.path + "user/LoginWithGoogle", JSON.stringify(credentials), { headers: header, withCredentials: true });
    }
  
    update(Id:any, data: any): Observable<any> {
      console.log(Id);
      console.log(data);
      let url = `${this.url}/user/register/${Id}`
      console.log(url);
      return this.http.put(url,data).pipe(tap((dat:any)=>console.log(`updated with ID =${Id}`)),
      catchError(this.errorMgmt));
    }
  
    setToken(token:string){
      localStorage.setItem('token',token);
    }
  
    getToken(){
      return localStorage.getItem('token');
      // return this.token;
    }
  
    deleteToken(){
      // localStorage.clear()
      localStorage.removeItem('token');
    }
  
    getUserPayload(){
      var token = this.getToken();
      if(token){
        var userPayload = atob(token.split('.')[1]); // token split in array lets use 2nd part
        return JSON.parse(userPayload);
      }
      else
      return null;
    }
  // used in authguard
    isLoggedIn(){
      var userPayload = this.getUserPayload();
      if(userPayload){
      return userPayload.exp > Date.now()/1000;
      }else
      return false;
    }
    
    //before auth guard and interceptor
    // login(body:any): Observable<any> {
    //   return this.http.post('this.url/user/login',body,{
    //     observe:'body',
    //     withCredentials:true,
    //     headers:new HttpHeaders().append('Content-Type','application/json')
    //   });
    // }
  
  
    
  
    // user(){
    //   return this.http.get('http://localhost:3000/api/v1/user/user',{
    //     observe:'body',
    //     withCredentials:true,
    //     headers:new HttpHeaders().append('Content-Type','application/json')
    //   })
    // }
  
    getUserbyEmail(_Email:any): Observable<Users> {
      console.log("i m in get  by emailloop");
      let url = `${this.url}/user/user/email/${_Email}`
      // return this.http.get(url,this.noAuthHeader);
      return this.http.get(url);
    }
  
    deletUserbyId(id:any):Observable<Users>{
      let url = `${this.url}/user/delete/${id}`
      return this.http.delete(url).pipe(tap((dat:any)=>
      console.log(` with ID =${id}`)
      ),
      catchError(this.errorMgmt));
    }
    // logout(){
  
    //   this.deleteToken();
    //   return this.http.get('/users/logout',{
    //     observe:'body',
    //     withCredentials:true,
    //     headers:new HttpHeaders().append('Content-Type','application/json')
    //   })
    // }

    
    signupEmail(body:any): Observable<any>{
      console.log(body);
      let url = `${this.url}/email_verification/signup`;
      return this.http.post(url,body).pipe(tap((dat:any)=>console.log(`Verified =${dat.verified }`)),
      catchError(this.errorMgmt));
    }  

  verifyEmail(body:any): Observable<any>{
    console.log(body);
    let url = `${this.url}/email_verification/verify`;
    return this.http.post(url,body).pipe(tap((dat:any)=>console.log(`Verified =${dat.verified }`)),
    catchError(this.errorMgmt));
  }

  newVerificationOTP(body:any): Observable<any>{
    console.log(body);
    let url = `${this.url}/email_verification/`;
    return this.http.post(url,body).pipe(tap((dat:any)=>console.log(`Added with ID =${dat._id}`)),
    catchError(this.errorMgmt));
  }



  

   // Error handling
   errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(error.error);
    
    console.log(errorMessage);
    return throwError(() => {
      return error;
    });
  }

  forgetPassword(body:any): Observable<any> {
    console.log(body);
      let url = `${this.url}/forgot_password`;
      console.log(url);
      return this.http.post(url,body,this.noAuthHeader).pipe(tap((dat:any)=>console.log(`Found with=${dat._id}`)),
      catchError(this.errorMgmt));
  }
  
  forgetPasswordReset(body:any): Observable<any> {
    console.log(body);
      let url = `${this.url}/forgot_password/reset`;
      console.log(url);
      return this.http.post(url,body,this.noAuthHeader).pipe(tap((dat:any)=>console.log(`reset password =${dat._id}`)),
      catchError(this.errorMgmt));
  }



}
