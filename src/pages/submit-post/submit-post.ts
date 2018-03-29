import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { CardsPage } from '../cards/cards'
import { CardHeader } from 'ionic-angular/components/card/card-header';
import { StorePostProvider } from '../../providers/store-post/store-post'
import { Observable } from 'rxjs/Observable';
import { GetUserInfoProvider } from '../../providers/get-user-info/get-user-info';

@IonicPage()
@Component({
  selector: 'page-submit-post',
  templateUrl: 'submit-post.html',
})
export class SubmitPostPage {
  body = '';
  AuthId;
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storePostService: StorePostProvider, public toastCtrl: ToastController, public getUserInfoService: GetUserInfoProvider
  ){
    this.AuthId = this.navParams.get('AuthId');
    this.getUserInfoService.getInfo(this.AuthId).subscribe(res=>{
      this.user= res.userInfo;
      console.log(res.userInfo);
      console.log(this.user.name);
      
    })
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
      this.storePostService.submitPost(this.body,this.AuthId).subscribe(res => {
          console.log('post has posted');
          let toast = this.toastCtrl.create({
            message: 'Your post submitted successfully !!!',
            duration: 3000,
            position: 'top'
            });
            toast.present();
            this.navCtrl.setRoot('CardsPage');
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
