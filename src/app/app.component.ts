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

  currentPageTitle = 'Home';
  
  menuType: string = 'reveal';
  public appPages: any[] =  [
    // {title: 'Account',url: '/login',icon: 'person'},
    {
      title: 'Home',url: '/home', icon: 'home'    },
   
    {
      title: 'About',url: '/about',icon: 'help'    },
   
    {title: 'Alumni', url: '/alumini', icon: 'person'},
    {title: 'Awards', url: '/awards', icon: 'information-circle'},
    {title: 'Donate', url: '/donate', icon: 'document-lock'},
    {title: 'Jobs', url:'/jobs', icon: 'log-out'},
    {title: 'Membership', url:'/membership', icon: 'log-out'},
    {title: 'Publications', url:'/publication', icon: 'log-out'},
    {title: 'Reunion', url:'/reunion', icon: 'log-out'},    
    {title: 'Team', url:'/team', icon: 'person'},

    {title: 'Sign Out', url: '', icon: 'log-out', route: true},
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
