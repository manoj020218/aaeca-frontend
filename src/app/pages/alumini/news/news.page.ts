import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  loadnews: Subscription;
  newss: any = [];
  membersCopy: News[] =[];
   //*** for search */
   searchTerm: string = '';
   searchResults: any[] = [];
   // to store searched result data
   filterednews: any[];

   //* for image uri
   baseUri : string = environment.SERVER;

  show = true;

  constructor(
    public router :Router,
    public route :ActivatedRoute,
    private newsApi : NewsService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.getNews();
  }

  handleRefresh(event) {
    setTimeout(() => {
      // this.getMembers();
      event.target.complete();
    }, 2000);
  };


  hide() {
    this.show = !this.show;
    console.log(this.show);
  }

  share() {
    console.log('check');
  }

  addNews(){
    this.router.navigate(['/alumini/news/addnews'],{replaceUrl:true});
  }

  // for search bar 
async handleInput(evt) {
// this.getMembers();
this.membersCopy = this.newss;
this.searchTerm = evt.srcElement.value;
if(!this.searchTerm) {
  this.getNews();// if empty load default value
  return;}
else{
this.search();
  }
 
}

async getNews() {
    console.log('get data from newss list');
    const loading = await this.loadingCtrl.create({
      message: 'Loading....'
    });
    await loading.present();  
    this.loadnews = this.newsApi.getAll()
    .subscribe(res=>{
      console.log(res.slice());
      this.newss=this.sortByLatest(res.slice(),'creation_dt');
      // this.newss = res;
      // console.log(res[0].image)
      this.filterednews = this.newss; // this filtermember array data is going at html page      
      loading.dismiss();
    }),err=>{
      console.log(err);
      loading.dismiss();
      }
   
  }
  

  sortByLatest(array: any[], datePropertyName: string): any[] {
    return array.sort((a, b) => {
      const dateA = new Date(a[datePropertyName]);
      const dateB = new Date(b[datePropertyName]);
      // Sort in descending order (latest first)
      return dateB.getTime() - dateA.getTime();
    });
  }


forImagePath(relpath:any){
// console.log(this.baseUri+'/newss/'+relpath);
return this.baseUri+'/news/'+relpath;
}


search() {
this.newsApi.query(this.searchTerm).subscribe({
  next:data=>{
    this.searchResults = data;
    // console.log(this.searchResults);
    this.filterednews = this.searchResults;
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
