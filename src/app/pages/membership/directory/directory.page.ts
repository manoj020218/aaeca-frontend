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
  

  filteredMembers: any[];
  baseUri : string = environment.SERVER;

  //*** for search */
  searchTerm: string = '';
  searchResults: any[] = [];

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
      this.members=this.sortByName(res.slice());
      // this.members = res;
      // console.log(res[0].image)
      this.filteredMembers = this.members; // this filtermember array data is going at html page
      
      loading.dismiss();
    }),err=>{
      console.log(err);
      loading.dismiss();
      }
      
    }
  
  
    sortByName(members) {
      // Define a comparison function
      const byLatest = function (member1, member2) {
        return member1.first_name.localeCompare(member2.first_name);
      };
    
      // Create a shallow copy of the 'members' array and sort it using the comparison function
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
  this.searchTerm = evt.srcElement.value;
  if(!this.searchTerm) {
    this.getMembers();// if empty load default value
    return;}
  else{
  this.search();
    }
   
}
  // const query = evt.target.value.toLowerCase();
  // this.results = this.members.m_name.filter((d) => d.toLowerCase().indexOf(query) > -1);



// searchText:any = '';
// <div *ngIf="searchText ===''|| m.first_name.toLowerCase().includes(searchText) || m.mobile.toLowerCase().includes(searchText) || m.m_degree.toLowerCase().includes(searchText)|| m.email.toLowerCase().includes(searchText)">
// onSearchTextEntered(searchValue:any){
// this.searchText = searchValue;
// console.log(this.searchText);
// }

forImagePath(relpath:any){
  // console.log(this.baseUri+'/members/'+relpath);
 return this.baseUri+'/members/'+relpath;
}

 
search() {
  this.memberApi.queryMembers(this.searchTerm).subscribe({
    next:data=>{
      this.searchResults = data;
      // console.log(this.searchResults);
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


}
