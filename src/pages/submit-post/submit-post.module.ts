import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitPostPage } from './submit-post';

@NgModule({
  declarations: [
    SubmitPostPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitPostPage),
  ],
})
export class SubmitPostPageModule {}
