import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembershipPageRoutingModule } from './membership-routing.module';

import { MembershipPage } from './membership.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MembershipPageRoutingModule
  ],
  declarations: [MembershipPage]
})
export class MembershipPageModule {}
