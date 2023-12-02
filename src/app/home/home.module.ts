import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { BannerComponent } from '../components/banner/banner.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BannerComponent,
    HomePageRoutingModule,
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // so that ion slide can be used
  declarations: [HomePage]
})
export class HomePageModule {}
