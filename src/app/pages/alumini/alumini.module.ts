import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AluminiPageRoutingModule } from './alumini-routing.module';

import { AluminiPage } from './alumini.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AluminiPageRoutingModule
  ],
  declarations: [AluminiPage]
})
export class AluminiPageModule {}
