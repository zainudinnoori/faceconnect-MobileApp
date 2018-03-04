import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from 'ionic-angular/components/item/item';
import { FollowingUsersPostProvider } from '../../providers/following-users-post/following-users-post'
import { PostLikesCommentsProvider } from '../../providers/post-likes-comments/post-likes-comments';
import { GetSinglePostProvider } from '../../providers/get-single-post/get-single-post'

@IonicPage()
@Component({
  selector: 'page-single-post',
  templateUrl: 'single-post.html',
})
export class SinglePostPage {
postId;
likes :any[];
likesCount : number;
likeUser: any[];
comments : any[];
commentsCount : number;
commentUser : any[];
pId: number;
post:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public post_like_comment_service : PostLikesCommentsProvider
  ,public getSinglePostService: GetSinglePostProvider
  ) 
  {
    this.postId = navParams.get('postId');

    // this.getSinglePostService.getPost(this.postId).
    // subscribe(data=>{
    //   this.post= data.post;
    // });


    this.post_like_comment_service.getLikes(this.postId).subscribe(data => {
      this.likes = data.likes;
      this.likeUser = data.user;
      this.likesCount = this.likes.length;
      console.log('Like counts: ', this.likesCount);
      // console.log('post id from signle post:');
    });

    this.post_like_comment_service.getComments(this.postId).subscribe(data => {
      this.comments = data.comments;
      this.commentUser = data.user;
      this.commentsCount = this.comments.length;
      this.commentUser = data.users;
      console.log('Comments owner: ', this.commentUser);
      console.log('Comments count: ', this.commentsCount);
      
      
    });

}
}