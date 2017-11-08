import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvertisingPage } from './advertising';

@NgModule({
  declarations: [
    AdvertisingPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvertisingPage),
  ],
  exports: [
    AdvertisingPage
  ]
})
export class AdvertisingPageModule {}
