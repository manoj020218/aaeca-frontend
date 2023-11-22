import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailnewsPage } from './detailnews.page';

const routes: Routes = [
  {
    path: '',
    component: DetailnewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailnewsPageRoutingModule {}
