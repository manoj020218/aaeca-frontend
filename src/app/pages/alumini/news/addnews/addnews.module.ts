import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnewsPageRoutingModule } from './addnews-routing.module';

import { AddnewsPage } from './addnews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddnewsPageRoutingModule
  ],
  declarations: [AddnewsPage]
})
export class AddnewsPageModule {}
