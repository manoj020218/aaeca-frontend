import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberformPageRoutingModule } from './memberform-routing.module';

import { MemberformPage } from './memberform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MemberformPageRoutingModule
  ],
  declarations: [MemberformPage]
})
export class MemberformPageModule {}
