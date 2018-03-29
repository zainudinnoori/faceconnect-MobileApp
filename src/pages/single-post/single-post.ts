import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,AlertController } from 'ionic-angular';
import { Item } from 'ionic-angular/components/item/item';
import { FollowingUsersPostProvider } from '../../providers/following-users-post/following-users-post'
import { PostLikesCommentsProvider } from '../../providers/post-likes-comments/post-likes-comments';
import { GetSinglePostProvider } from '../../providers/get-single-post/get-single-post'
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';
import { StoreCommentProvider } from '../../providers/store-comment/store-comment';
import { StoreLikeProvider  } from '../../providers/store-like/store-like'
import { SharePostProvider} from '../../providers/share-post/share-post'


@IonicPage()
@Component({
  selector: 'page-single-post',
  templateUrl: 'single-post.html',
})
export class SinglePostPage {
postId;
post:any;
AuthId;
AuthName;
commentBody =''
  constructor(public navCtrl: NavController, public navParams: NavParams, public post_like_comment_service : PostLikesCommentsProvider
  ,public getSinglePostService: GetSinglePostProvider,public storeCommentService: StoreCommentProvider, public storeLikeService: StoreLikeProvider,
  public toastCtrl : ToastController,public sharePostService: SharePostProvider, public alertCtrl : AlertController
  ) 
  {
    this.postId = navParams.get('postId');
    console.log(this.postId);

    this.AuthId = this.navParams.get('AuthId')
    this.AuthName = localStorage.getItem('AuthName');
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

    let comment  = 
      {
        "post_id": 5,
        "body": form.value.commentBody,
        "created_at":Date(),
        "comment_user": {
          "id": this.AuthId,
          "name": this.AuthName,
          "image": "586ad521b9545ab3e5d1accab3e49d7c.jpg"
          }
      }

    this.post.comments.push(comment);
    this.commentBody ="";
    this.storeCommentService.storeComment(form.value.postId,form.value.commentBody, this.AuthId).subscribe(res=>{
      console.log(res.status);
    })
  }

  goToUserProfilePage(Uid : number){
    this.navCtrl.push('UserProfilePage',{
      Uid: Uid
    });
}


likePost(postId){
  this.storeLikeService.store(postId, this.AuthId).subscribe(res=>{
    console.log('done' + res.status);
    // this.post.like.likes_count = this.post.like.likes_count + 1
  })
}

sharePost(postId) {
  let confirm = this.alertCtrl.create({
    title: 'Are you sure ? ',
    message: 'You want to share this post.',
    buttons: [
      {
        text: 'Cancle',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Share',
        handler: () => {
          console.log('Agree clicked');
          this.sharePostService.share(postId , this.AuthId).subscribe(res=>{
            console.log(res);
            this.navCtrl.setRoot('CardsPage');            
            let toast = this.toastCtrl.create({
              message: 'Post has been Shared successfully',
              duration: 3000,
              position: 'top'
              });
              toast.present();
            // this.posts.();
          })
        }
      }
    ]
  });
  confirm.present();
}

}