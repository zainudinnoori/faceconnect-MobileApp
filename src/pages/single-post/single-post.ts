import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from 'ionic-angular/components/item/item';
import { FollowingUsersPostProvider } from '../../providers/following-users-post/following-users-post'
import { PostLikesCommentsProvider } from '../../providers/post-likes-comments/post-likes-comments';
import { GetSinglePostProvider } from '../../providers/get-single-post/get-single-post'
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';
import { StoreCommentProvider } from '../../providers/store-comment/store-comment';


@IonicPage()
@Component({
  selector: 'page-single-post',
  templateUrl: 'single-post.html',
})
export class SinglePostPage {
postId;
post:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public post_like_comment_service : PostLikesCommentsProvider
  ,public getSinglePostService: GetSinglePostProvider,public storeCommentService: StoreCommentProvider
  ) 
  {
    this.postId = navParams.get('postId');
    console.log(this.postId);

    this.getSinglePostService.getPost(this.postId).
    subscribe(data=>{
      this.post = data.post;
      console.log('post' , this.post);
    });

}
  goToUserProfile(userId){
    console.log('user' , userId)
      // this.navCtrl.push('UserProfilePage',{
      //   userId : userId
      // })
  }

  onSubmit(form){
    this.storeCommentService.storeComment(form.value.postId,form.value.commentBody, 59).subscribe(res=>{
      console.log(res.status);
      // form.commentBody.value="";
    })
    console.log(form.value.postId,form.value.commentBody);
  }

  goToUserProfilePage(Uid : number){
    this.navCtrl.push('UserProfilePage',{
      Uid: Uid
    });
}

}