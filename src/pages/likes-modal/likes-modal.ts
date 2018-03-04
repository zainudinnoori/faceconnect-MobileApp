import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile'
/**
 * Generated class for the LikesModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-likes-modal',
  templateUrl: 'likes-modal.html',
})
export class LikesModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LikesModalPage');
  }

  dismiss()
  {
    this.navCtrl.push('ProfilePage');
  }
}
