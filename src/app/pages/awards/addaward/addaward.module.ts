import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddawardPageRoutingModule } from './addaward-routing.module';

import { AddawardPage } from './addaward.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddawardPageRoutingModule
  ],
  declarations: [AddawardPage]
})
export class AddawardPageModule {}
