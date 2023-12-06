import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberformPage } from './memberform.page';

const routes: Routes = [
  {
    path: '',
    component: MemberformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberformPageRoutingModule {}
