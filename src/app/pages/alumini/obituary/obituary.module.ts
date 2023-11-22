import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObituaryPageRoutingModule } from './obituary-routing.module';

import { ObituaryPage } from './obituary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObituaryPageRoutingModule
  ],
  declarations: [ObituaryPage]
})
export class ObituaryPageModule {}
