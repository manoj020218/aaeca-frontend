import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonnerwallPage } from './donnerwall.page';

const routes: Routes = [
  {
    path: '',
    component: DonnerwallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonnerwallPageRoutingModule {}
