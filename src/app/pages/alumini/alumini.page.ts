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
import { NotablealumniService } from 'src/app/services/notablealumni.service';
import { Alumni } from 'src/app/models/notablealumni';



@Component({
  selector: 'app-alumini',
  templateUrl: './alumini.page.html',
  styleUrls: ['./alumini.page.scss'],
})
export class AluminiPage implements OnInit {
  selectedCategory = 'academy';
  items: Alumni[] =[];

  loadMembers: Subscription;
  members: any = [];
  membersCopy: Alumni[] =[];

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
    public memberApi:NotablealumniService,
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

    this.memberApi.getAll().subscribe((data) => {
      this.items = data;
      // Assuming your JSON data has a 'category' field
      this.selectedCategory = this.items[0]?.category;
    });
  }


  segmentChanged(event: any) {
    this.selectedCategory = event.detail.value;
  }

}
