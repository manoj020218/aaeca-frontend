import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

//for geolocation
import { Geolocation } from '@capacitor/geolocation';

register();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  submenus = {
    subMenu1: false,
    // Add more submenus as needed...
  };

  submenue:boolean=false;

  currentPageTitle = 'Home';

  menuType: string = 'reveal';
  public appPages: any[] =  [
    // {title: 'Account',url: '/login',icon: 'person'},
    {title: 'Home',url: '/home', icon: 'home' ,submenue: false  },
    {title: 'About',
    // url: '/about',
    icon: 'tv' ,
    submenue: true,
  children:[
    {title: 'About',url: '/about', icon: 'tv' },
    {title: 'The Board',url: '/home', icon: 'medical'},
    {title: 'Constitution',url: '/home', icon: 'reader'}
  ]
},


    {title: 'Alumni',
    // url: '/alumini',
    icon: 'leaf', submenue: true ,
    children:[
      {title: 'Alumni',url: '/alumini', icon: 'leaf' },
      {title: 'Chapter',url: '/alumini/chapter', icon: 'globe'},
      {title: 'Alumni News',url: '/alumini/news', icon: 'newspaper'},
      {title: 'Obituary',url: '/alumini/obituary', icon: 'battery-dead'},
    ]
  },
    {title: 'Awards', url: '/awards', icon: 'trophy',submenue: true},
    {title: 'Donate', url: '/donate', icon: 'card' ,submenue: false},
    {title: 'Jobs', url:'/jobs', icon: 'desktop' ,submenue: false},
  {title: 'Membership',
    // url:'/membership',
    icon: 'person',submenue: true,
    children:[
      {title: 'Membership',url: '/membership', icon: 'person' },
      {title: 'Directory',url: '/membership/directory', icon: 'id-card'},
    ]
  },


    {title: 'Publications', url:'/publication', icon: 'book',submenue: false},
    {title: 'Reunion', url:'/reunion', icon: 'link',submenue: true},
    {title: 'Team', url:'/team', icon: 'people',submenue: true},

    {title: 'Sign Out', url: '', icon: 'log-out', route: true ,submenue: false},
    // {title: 'Team', url:'/team', icon: 'persons', route: true},
  ];
  loggeduser: any;
  mobile: string | undefined;
  username: any;
  image: any;
  title: string|undefined;
  current_lattitude: number;
  current_longitude: number;


  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private plt: Platform
  ) {
    this.mobile ="7891012342";
    this.loggeduser ="YourCompanion@alumnieca.org";
    this.username = "Alumni Association"
  }

  signOut(){
    console.log("sign out clicked");
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    this.menuCtrl.close(); // force close the menu
  }

  ngOnInit() {
    const width = this.plt.width();
    this.toggleMenu(width);
    this.printCurrentPosition();
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: { target: { innerWidth: any; }; }) {
    const newWidth = event.target.innerWidth;
    this.toggleMenu(newWidth);
  }

  toggleMenu(width: number) {
    if (width > 768) {
      this.menuCtrl.enable(false, 'myMenu');
    } else {
      this.menuCtrl.enable(true, 'myMenu');
    }
  }

  setTitle(title: any) {
    this.currentPageTitle = title
  }


  async printCurrentPosition(){
    const coordinates = await Geolocation.getCurrentPosition();
    this.current_lattitude = coordinates.coords.latitude;
    this.current_longitude = coordinates.coords.longitude;
    localStorage.setItem('my_lat',this.current_lattitude.toString());
    localStorage.setItem('my_long',this.current_longitude.toString());
  
    console.log('Current position:', coordinates);
  };

  //set location position to storage then use to fill form or update form data later on.


}
