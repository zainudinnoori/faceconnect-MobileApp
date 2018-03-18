import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { CardsPage } from '../cards/cards'
import { CardHeader } from 'ionic-angular/components/card/card-header';
import { StorePostProvider } from '../../providers/store-post/store-post'
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-submit-post',
  templateUrl: 'submit-post.html',
})
export class SubmitPostPage {
  body:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storePostService: StorePostProvider, public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitPostPage');
  }
  dismiss(){
    this.navCtrl.pop();
  }

  Post(){
    if(this.body != '' || this.body != null)
    {
      this.storePostService.submitPost(this.body).subscribe(res => {
          console.log('post has posted');
          let toast = this.toastCtrl.create({
            message: 'Your post submitted successfully !!!',
            duration: 3000,
            position: 'top'
            });
            toast.present();
            this.navCtrl.pop();
    },err => {
        console.log('error back to submit post component')
    });
  }
  else{
    let toast = this.toastCtrl.create({
      message: 'Please write someting !!',
      duration: 3000,
      position: 'top'
      });
      toast.present();
  }

  }
}
