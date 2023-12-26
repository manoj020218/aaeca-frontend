import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { JobsPage } from './jobs.page';

const routes: Routes = [
  {
    path: '',
    component: JobsPage
  },
  {
    path: 'addjob',
    loadChildren: () => import('./addjob/addjob.module').then( m => m.AddjobPageModule)
    // ,canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsPageRoutingModule {}
