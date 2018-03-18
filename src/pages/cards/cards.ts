import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { NotificationsPage } from '../notifications/notifications';
import { SinglePostPage } from '../single-post/single-post';
import { SubmitPostPage } from '../submit-post/submit-post';
import { Item } from 'ionic-angular/components/item/item';
import { SessionStorage } from 'angular-web-storage';
import { FollowingUsersPostProvider } from '../../providers/following-users-post/following-users-post'
import { ModalController, NavParams } from 'ionic-angular';
import { PostCollection } from '../../models/postscollection';
import { Post } from '../../models/post';
import { StoreLikeProvider } from '../../providers/store-like/store-like';
import { StoreCommentProvider } from '../../providers/store-comment/store-comment';
import { PostCrudProvider } from '../../providers/post-crud/post-crud';
import { concat } from 'rxjs/operators/concat';
import { SharePostProvider } from '../../providers/share-post/share-post';
import { style, state ,animate, keyframes , trigger , transition} from '@angular/animations';
 

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',

  // animations:[
  //   trigger('hitLike',[
  //     state('liked',style({
  //       color:'blue'
  //     })),

  //     state('unliked',style({
  //       color:'grey'
  //     })),
  //   ])
  // ],
})

export class CardsPage {
  posts:Post[];
  commentBody: string;
  uId = localStorage.getItem('AuthId');
  state : string = "unliked";
  likeButtonColor :boolean = true;
  
  constructor(public navCtrl: NavController,public followingUsersPostService: FollowingUsersPostProvider,public modalCtrl: ModalController,
    public storeLikeService: StoreLikeProvider,public storeCommentService: StoreCommentProvider , public postCrudService: PostCrudProvider,
    public sharePostService: SharePostProvider,){

      // this.postsService.posts().subscribe(data => this.posts = data);
      this.followingUsersPostService.posts(this.uId).subscribe(data => {
        this.posts = data.posts;
      });
      
  
  }

  goToNotifications(){
    this.navCtrl.push('NotificationsPage');
  }
  goToProfilePage(){
    this.navCtrl.push('ProfilePage');
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
    // if(this.state === 'liked' ? this.state='unliked' : this.state='liked')
    // if(this.likeButtonColor  == true ? this.likeButtonColor = false : this.likeButtonColor = true )
    this.storeLikeService.store(postId, this.uId).subscribe(res=>{
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
    this.postCrudService.deletePost(postId,this.uId).subscribe(res=>{
      console.log(res);
    })
    console.log('you wanna delete' + postId +' post');
  }

  editPost(post){
    this.navCtrl.push('PostEditPage',{
      post:post
    });
  }

  sharePost(postId){
    this.sharePostService.share(postId , this.uId).subscribe(res=>{
      console.log(res);
    })
    // console.log(postId +'-----------'+ this.uId);
  }

  openLikesModal(pId:number){
    let likeModal = this.modalCtrl.create('LikesModalPage',{pId : pId});
    likeModal.present();
  }

  openCommentsModal(pId:number){
    let commentModal = this.modalCtrl.create('CommentsmodalPage',{pId : pId});
    commentModal.present();
}

  
}
