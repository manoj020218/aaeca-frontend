import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembershipPage } from './membership.page';

import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MembershipPage
  },
  {
    path: 'directory',
    loadChildren: () => import('./directory/directory.module').then( m => m.DirectoryPageModule)
    // ,canActivate: [AuthGuard]
  },
  {
    path: 'memberform',
    loadChildren: () => import('./memberform/memberform.module').then( m => m.MemberformPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembershipPageRoutingModule {}
