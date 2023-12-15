import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { AlertController,LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
 
// animation from right to left for modal open 
import { AnimationController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { AwardService } from 'src/app/services/award.service';
import { Award } from 'src/app/models/award';



@Component({
  selector: 'app-awards',
  templateUrl: './awards.page.html',
  styleUrls: ['./awards.page.scss'],
})
export class AwardsPage implements OnInit {
  loadMembers: Subscription;
  members: any = [];
  membersCopy: Award[] =[];

  searchField: FormControl;

  filteredMembers: any[];
  baseUri : string = environment.SERVER;

  //*** for search */
  searchTerm: string = '';
  searchResults: any[] = [];

  public results = [...this.members];// to be used for search bar

  show: boolean;

  constructor(    
    private animationCtrl: AnimationController, // for animation control 
    private loadingCtrl: LoadingController,
    public router :Router,
    public route :ActivatedRoute,
    public memberApi:AwardService,
    // public userApi: UserService,    
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    // private navCtrl: NavController,
    private cd: ChangeDetectorRef,
    private plt: Platform,

  ) { this.searchField = new FormControl(''); // for search bar
}

  ngOnInit() {
    // this.getAwards();
  }


  async getAwards(){
    console.log('get data from award list');
    const loading = await this.loadingCtrl.create({
      message: 'Loading....'
    });
    await loading.present();
  
    this.loadMembers = this.memberApi.getAll()
    .subscribe(res=>{
      console.log(res.slice());
      this.members=this.sortByLatest(res.slice());
      this.filteredMembers = this.members; // this filtermember array data is going at html page
      
      loading.dismiss();
    }),err=>{
      console.log(err);
      loading.dismiss();
      }
      
    }
  
  
    sortByLatest(members) {
      const byLatest = function (member1, member2) {
        return member1.first_name.localeCompare(member2.first_name);
      };
      return members.slice().sort(byLatest);
    }
  
    sortByEndDate(members){    
      const byLatest = function(member1,member2) {
        return member1.m_enddate.Compare(member2.m_enddate);
      };
      return members.slice().sort(byLatest);
  
    }
  

    handleRefresh(event) {
      setTimeout(() => {
        this.getAwards();
        event.target.complete();
      }, 2000);
    };

    // for search bar 
async handleInput(evt) {
  // this.getAwards();
  this.membersCopy = this.members;
  this.searchTerm = evt.srcElement.value;
  if(!this.searchTerm) {
    this.getAwards();// if empty load default value
    return;}
  else{
  this.search();
    }
   
}

  


forImagePath(relpath:any){
  return this.baseUri+'/awards/'+relpath;
 }
 
  
 search() {
   this.memberApi.query(this.searchTerm).subscribe({
     next:data=>{
       this.searchResults = data;
       console.log(this.searchResults);
       this.filteredMembers = this.searchResults;
     },
     error:err=>{
       this.presentToast(err);
     }
   });
 }
 
   // Little helper
   async presentToast(text) {
     const toast = await this.toastCtrl.create({
       message: text,
       duration: 3000
     });
     toast.present();
   }
 

   
  hide() {
    this.show = !this.show;
    console.log(this.show);
  }

  share() {
    console.log('check');
  }
  

  addAward(){
    this.router.navigate(['/awards/addaward'],{replaceUrl:true});  
  }
}
