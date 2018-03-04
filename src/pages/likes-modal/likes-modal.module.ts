import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LikesModalPage } from './likes-modal';

@NgModule({
  declarations: [
    LikesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(LikesModalPage),
  ],
})
export class LikesModalPageModule {}
