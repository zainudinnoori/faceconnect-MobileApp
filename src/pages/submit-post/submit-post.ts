import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardsPage } from '../cards/cards'
import { CardHeader } from 'ionic-angular/components/card/card-header';
/**
 * Generated class for the SubmitPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submit-post',
  templateUrl: 'submit-post.html',
})
export class SubmitPostPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitPostPage');
  }
  dismiss(){
    this.navCtrl.pop();
  }

  Post(){
    alert('post done');
  }
}
