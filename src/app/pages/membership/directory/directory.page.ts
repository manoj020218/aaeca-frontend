import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { AlertController,LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { Member } from 'src/app/models/member';
// animation from right to left for modal open 
import { AnimationController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {
  loadMembers: Subscription;
  members: any = [];
  membersCopy: Member[] =[];

  searchField: FormControl;
  searchTerm: string = '';

  filteredMembers: any[];
  baseUri : string = environment.SERVER;

  public results = [...this.members];// to be used for search bar

  constructor(
     
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
    this.searchField = new FormControl(''); // for search bar
   }

  ngOnInit() {
    this.getMembers();
  }


  async getMembers(){
    console.log('get data from members list');
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
        this.getMembers();
        event.target.complete();
      }, 2000);
    };

    // for search bar 
async handleInput(evt) {
  // this.getMembers();
  this.membersCopy = this.members;
  const searchTerm = evt.srcElement.value;
  if(!searchTerm) {
    this.getMembers();// if empty load default value
    return;}
  
  if(Array.isArray(this.membersCopy)){
    this.filteredMembers = this.membersCopy.filter(member =>
      member.first_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
   
}
  // const query = evt.target.value.toLowerCase();
  // this.results = this.members.m_name.filter((d) => d.toLowerCase().indexOf(query) > -1);
}


searchText:any = '';

onSearchTextEntered(searchValue:any){
this.searchText = searchValue;
console.log(this.searchText);
}

forImagePath(relpath:any){
 return this.baseUri+'/members/'+relpath;
}

 

}
