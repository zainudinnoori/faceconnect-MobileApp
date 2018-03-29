import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
  public alertCtrl : AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }


  signout() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure ? ',
      message: 'You wanna logout.',
      buttons: [
        {
          text: 'Cancle',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            console.log('Agree clicked');
            this.storage.set('Auth', ''); 
            this.navCtrl.setRoot('LoginPage');
          }
        }
      ]
    });
    confirm.present();
  }
}
