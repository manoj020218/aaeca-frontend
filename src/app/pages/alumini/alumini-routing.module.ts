import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AluminiPage } from './alumini.page';

const routes: Routes = [
  {
    path: '',
    component: AluminiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AluminiPageRoutingModule {}
