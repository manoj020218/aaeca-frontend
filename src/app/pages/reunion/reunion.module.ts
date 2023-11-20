import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReunionPageRoutingModule } from './reunion-routing.module';

import { ReunionPage } from './reunion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReunionPageRoutingModule
  ],
  declarations: [ReunionPage]
})
export class ReunionPageModule {}
