import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
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
    icon: 'help' ,
    submenue: true,
  children:[
    {title: 'About',url: '/about', icon: 'home' },
    {title: 'The Board',url: '/home', icon: 'home'},
    {title: 'Constitution',url: '/home', icon: 'home'}
  ]   
}, 
    
    
    {title: 'Alumni', 
    // url: '/alumini', 
    icon: 'person', submenue: true ,
    children:[
      {title: 'Alumni',url: '/alumini', icon: 'home' },
      {title: 'Chapter',url: '/alumini/chapter', icon: 'home'},
      {title: 'Alumni News',url: '/alumini/news', icon: 'home'},
      {title: 'Obituary',url: '/alumini/obituary', icon: 'home'},
    ]   
  },
    {title: 'Awards', url: '/awards', icon: 'information-circle',submenue: true},
    {title: 'Donate', url: '/donate', icon: 'document-lock' ,submenue: false},
    {title: 'Jobs', url:'/jobs', icon: 'log-out' ,submenue: false},
    {title: 'Membership', url:'/membership', icon: 'log-out',submenue: true},
    {title: 'Publications', url:'/publication', icon: 'log-out',submenue: false},
    {title: 'Reunion', url:'/reunion', icon: 'log-out',submenue: true},    
    {title: 'Team', url:'/team', icon: 'person',submenue: true},

    {title: 'Sign Out', url: '', icon: 'log-out', route: true ,submenue: false},
    // {title: 'Team', url:'/team', icon: 'persons', route: true},
  ];
  loggeduser: any;
  mobile: string | undefined;
  username: any;
  image: any;
title: string|undefined;

  
  constructor(
    private router: Router,
    private menuCtrl: MenuController, 
    private plt: Platform
  ) {
    this.mobile ="7891012342";
    this.loggeduser ="manoj020218@gmail.com";
    this.username = "Manoj Jain"
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


}
