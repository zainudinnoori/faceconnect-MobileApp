import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/providers';
import { GetUserInfoProvider } from '../../providers/get-user-info/get-user-info'
import { GetUserOwnPostsProvider } from "../../providers/get-user-own-posts/get-user-own-posts";
import { StoreCommentProvider } from '../../providers/store-comment/store-comment'
import { StoreLikeProvider } from '../../providers/store-like/store-like';


@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
user:any;
uId;
Posts:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public getUserInfoService : GetUserInfoProvider
  ,public getUserOwnPostsService :GetUserOwnPostsProvider, public storeCommentService: StoreCommentProvider,
   public storeLikeService : StoreLikeProvider)
   {
    this.uId = this.navParams.get('uId');
    console.log(this.uId);

    //Getting user information from users table
    this.getUserInfoService.getInfo(this.uId).subscribe(data=>{
      this.user = data.userInfo;
    })

    //Getting userOwn posts
    this.getUserOwnPostsService.getPosts(this.uId).subscribe(data=>{
      this.Posts = data.posts;
      console.log(data)
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
  onSubmit(form){
    this.storeCommentService.storeComment(form.value.postId,form.value.commentBody, 59).subscribe(res=>{
      console.log(res.status);
      // form.commentBody.value="";
    })
    // console.log(form.value.postId,form.value.commentBody);
  }

  likePost(postId){
    this.storeLikeService.store(postId, this.uId).subscribe(res=>{
      console.log('done' + res.status);
    })
  }


}
