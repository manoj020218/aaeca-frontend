import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObituaryPage } from './obituary.page';

const routes: Routes = [
  {
    path: '',
    component: ObituaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObituaryPageRoutingModule {}
