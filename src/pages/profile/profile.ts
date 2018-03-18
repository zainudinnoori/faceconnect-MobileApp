import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LikesModalPage } from '../likes-modal/likes-modal'
import { GetUserInfoProvider } from '../../providers/get-user-info/get-user-info'
import { GetUserOwnPostsProvider } from "../../providers/get-user-own-posts/get-user-own-posts";
import { Item } from 'ionic-angular/components/item/item';
import { PostCollection } from '../../models/postscollection';
import { StoreLikeProvider } from '../../providers/store-like/store-like';
import { StoreCommentProvider } from '../../providers/store-comment/store-comment';
import { PostCrudProvider } from '../../providers/post-crud/post-crud';
import { concat } from 'rxjs/operators/concat';
import { SharePostProvider } from '../../providers/share-post/share-post';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
user:any[];
Posts:any[];
AuthId;
  constructor(public navCtrl: NavController, public navParams: NavParams,public getUserInfoService : GetUserInfoProvider,public getUserOwnPostsService : GetUserOwnPostsProvider,
    public storeLikeService: StoreLikeProvider,public storeCommentService: StoreCommentProvider , public postCrudService: PostCrudProvider,
    public sharePostService: SharePostProvider,) {
    console.log(localStorage.getItem('Auth'));
    this.AuthId =  localStorage.getItem('AuthId');


    this.getUserInfoService.getInfo(this.AuthId).subscribe(data=>{
      this.user = data.userInfo;
    })

    this.getUserOwnPostsService.getPosts(this.AuthId).subscribe(data=>{
      this.Posts = data.posts;
      console.log(data.posts);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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
      postId: postId
    });
  }

  goToSubmitPostPage(){
    this.navCtrl.push('SubmitPostPage');
  }

  
  likePost(postId){
    this.storeLikeService.store(postId, this.AuthId).subscribe(res=>{
      console.log('done' + res.status);
    })
  }

  onSubmit(form){
    this.storeCommentService.storeComment(form.value.postId,form.value.commentBody, 59).subscribe(res=>{
      console.log(res.status);
      // form.commentBody.value="";
    })
    // console.log(form.value.postId,form.value.commentBody);
  }

  deletePost(postId){
    this.postCrudService.deletePost(postId,this.AuthId).subscribe(res=>{
      console.log(res);
    })
    console.log('you wanna delete' + postId +' post');
  }

  showPost(postId){
    this.navCtrl.push('PostEditPage');
  }

  sharePost(postId){
    this.sharePostService.share(postId , this.AuthId).subscribe(res=>{
      console.log(res);
    })
    // console.log(postId +'-----------'+ this.uId);
  }
}



