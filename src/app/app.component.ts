import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    {
      title: 'Account',url: '/login',icon: 'person'    },
    {
      title: 'Home',url: '/home', icon: 'home'    },
   
    {
      title: 'About',url: '/about',icon: 'help'    },
   
    {title: 'Alumini', url: '/alumini', icon: 'person'},
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

  
  constructor(
    private router: Router,
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

}
