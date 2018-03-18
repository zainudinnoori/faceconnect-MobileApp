import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items, User } from '../../providers/providers';
import { GetFollowersProvider } from '../../providers/get-followers/get-followers'
import { NavParams } from 'ionic-angular/navigation/nav-params';

@IonicPage()
@Component({
  selector: 'page-followers',
  templateUrl: 'followers.html',
})
export class FollowersPage {


  user: User;
  followers:any[];
  userId;
  constructor(public navCtrl: NavController,public navParams : NavParams, public items: Items, public modalCtrl: ModalController, public getFollowers: GetFollowersProvider) {

    this.userId = this.navParams.get('userId');
    
    this.getFollowers.getFollowers(this.userId).subscribe(data =>{
      this.followers= data.followers;
      console.log(this.followers.length)
    })
  }


  goToUserProfilePage(uId : number){
    console.log(uId);
    this.navCtrl.push('UserProfilePage',{
      uId: uId
    });
  }

}
