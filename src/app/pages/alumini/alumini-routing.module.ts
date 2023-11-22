import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AluminiPage } from './alumini.page';

const routes: Routes = [
  {
    path: '',
    component: AluminiPage
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'obituary',
    loadChildren: () => import('./obituary/obituary.module').then( m => m.ObituaryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AluminiPageRoutingModule {}
