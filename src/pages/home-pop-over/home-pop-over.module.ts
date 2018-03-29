import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePopOverPage } from './home-pop-over';

@NgModule({
  declarations: [
    HomePopOverPage,
  ],
  imports: [
    IonicPageModule.forChild(HomePopOverPage),
  ],
})
export class HomePopOverPageModule {}
