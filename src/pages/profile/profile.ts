import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LikesModalPage } from '../likes-modal/likes-modal'
import { GetUserInfoProvider } from '../../providers/get-user-info/get-user-info'
import { GetUserOwnPostsProvider } from "../../providers/get-user-own-posts/get-user-own-posts";
import { Item } from 'ionic-angular/components/item/item';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
user:any[];
userPosts:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public getUserInfoService : GetUserInfoProvider,public getUserOwnPostsService : GetUserOwnPostsProvider) {
    console.log(localStorage.getItem('Auth'));
    let uId= 59;


    this.getUserInfoService.getInfo(uId).subscribe(data=>{
      this.user = data.userInfo;
    })

    this.getUserOwnPostsService.getPosts(uId).subscribe(data=>{
      this.userPosts = data.posts;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  goToLikePage(){
    this.navCtrl.push('LikesModalPage');
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

  goToSinglePost(postId){
    this.navCtrl.push('SinglePostPage',{
      item: postId
    });
  }

}
