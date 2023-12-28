import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AwardsPage } from './awards.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AwardsPage
  },
  {
    path: 'addaward',
    loadChildren: () => import('./addaward/addaward.module').then( m => m.AddawardPageModule)
    // ,canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AwardsPageRoutingModule {}
