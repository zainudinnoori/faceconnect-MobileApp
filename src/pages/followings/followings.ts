import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items, User } from '../../providers/providers';
import { GetFollowingsProvider } from '../../providers/get-followings/get-followings'
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { FollowUserProvider } from '../../providers/follow-user/follow-user'


@IonicPage()
@Component({
  selector: 'page-followings',
  templateUrl: 'followings.html',
})
export class FollowingsPage {
  user : User;
  followings: any[];
  userId;
  uId = localStorage.getItem('AuthId');
  // followingss:string[] = this.followings[name];


  constructor(public navCtrl: NavController,public navParams: NavParams, public items: Items, public modalCtrl: ModalController, public getFollowingsService: GetFollowingsProvider,
    public followUserService: FollowUserProvider
  ) {
    this.userId = this.navParams.get('userId');
  

    this.getFollowingsService.getFollowings(this.userId).subscribe(data=>{
      this.followings= data.followings;
      console.log(this.followings.length)

    })

    
  }


  goToUserProfilePage(uId:number){
    console.log(uId)
    this.navCtrl.push('UserProfilePage',{
      uId : uId
    });
  }

  followUser(userId) {
    this.followUserService.follow(this.uId , userId).subscribe(data=>{
      console.log(data.status);
      this.getFollowingsService.getFollowings(this.userId).subscribe(data=>{
        this.followings= data.followings;
        console.log(this.followings.length)
  
      })
    });
   console.log('userId which you follow------------' + userId);
  }


}
