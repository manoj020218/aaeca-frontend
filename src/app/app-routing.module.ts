import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'alumini',
    loadChildren: () => import('./pages/alumini/alumini.module').then( m => m.AluminiPageModule)
  },
  {
    path: 'reunion',
    loadChildren: () => import('./pages/reunion/reunion.module').then( m => m.ReunionPageModule)
  },
  {
    path: 'awards',
    loadChildren: () => import('./pages/awards/awards.module').then( m => m.AwardsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./pages/jobs/jobs.module').then( m => m.JobsPageModule)
  },
  {
    path: 'membership',
    loadChildren: () => import('./pages/membership/membership.module').then( m => m.MembershipPageModule)
  },
  {
    path: 'donate',
    loadChildren: () => import('./pages/donate/donate.module').then( m => m.DonatePageModule)
  },
  {
    path: 'publication',
    loadChildren: () => import('./pages/publication/publication.module').then( m => m.PublicationPageModule)
  },
  {
    path: 'team',
    loadChildren: () => import('./pages/team/team.module').then( m => m.TeamPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./account/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./account/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'addnews',
    loadChildren: () => import('./pages/news/addnews/addnews.module').then( m => m.AddnewsPageModule)
    // ,canActivate: [AuthGuard]
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./account/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
