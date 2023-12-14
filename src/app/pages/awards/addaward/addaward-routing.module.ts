import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddawardPage } from './addaward.page';

const routes: Routes = [
  {
    path: '',
    component: AddawardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddawardPageRoutingModule {}
