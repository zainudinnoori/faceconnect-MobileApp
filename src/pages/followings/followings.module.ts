import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowingsPage } from './followings';

@NgModule({
  declarations: [
    FollowingsPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowingsPage),
  ],
})
export class FollowingsPageModule {}
