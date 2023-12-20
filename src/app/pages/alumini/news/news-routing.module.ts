import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsPage } from './news.page';

const routes: Routes = [
  {
    path: '',
    component: NewsPage
  },
  {
    path: 'detailnews',
    loadChildren: () => import('./detailnews/detailnews.module').then( m => m.DetailnewsPageModule)
  },
  {
    path: 'addnews',
    loadChildren: () => import('./addnews/addnews.module').then( m => m.AddnewsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsPageRoutingModule {}
