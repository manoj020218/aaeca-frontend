import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonnerwallPageRoutingModule } from './donnerwall-routing.module';

import { DonnerwallPage } from './donnerwall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonnerwallPageRoutingModule
  ],
  declarations: [DonnerwallPage]
})
export class DonnerwallPageModule {}
