import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/providers';
import { GetUserInfoProvider } from '../../providers/get-user-info/get-user-info'
import { GetUserOwnPostsProvider } from "../../providers/get-user-own-posts/get-user-own-posts";

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
user:any;
uId;
userPosts:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public getUserInfoService : GetUserInfoProvider
  ,public getUserOwnPostsService :GetUserOwnPostsProvider
  ) {
    this.uId = this.navParams.get('Uid');
    console.log(this.uId);

    //Getting user information from users table
    this.getUserInfoService.getInfo(this.uId).subscribe(data=>{
      this.user = data.userInfo;
    })

    //Getting userOwn posts
    this.getUserOwnPostsService.getPosts(this.uId).subscribe(data=>{
      this.userPosts = data.posts;
    })
  
  } 

  goToFollowers(userId){
    this.navCtrl.push('FollowersPage',{
      userId: userId
    });
  }

  goToFollowings(userId){
    this.navCtrl.push('FollowingsPage',{
      userId:userId
    });
  }

  goToAllImagesPage(userId){
    this.navCtrl.push('PhotosPage',{
      userId : userId
    })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

}
