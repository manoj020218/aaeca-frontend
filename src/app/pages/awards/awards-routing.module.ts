import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AwardsPage } from './awards.page';

const routes: Routes = [
  {
    path: '',
    component: AwardsPage
  },
  {
    path: 'addaward',
    loadChildren: () => import('./addaward/addaward.module').then( m => m.AddawardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AwardsPageRoutingModule {}
