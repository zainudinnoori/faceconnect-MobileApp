import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController,LoadingController,PopoverController  } from 'ionic-angular';
import { User } from '../../providers/providers';
import { GetUserInfoProvider } from '../../providers/get-user-info/get-user-info'
import { GetUserOwnPostsProvider } from "../../providers/get-user-own-posts/get-user-own-posts";
import { StoreCommentProvider } from '../../providers/store-comment/store-comment'
import { StoreLikeProvider } from '../../providers/store-like/store-like';
import { FollowUserProvider } from '../../providers/follow-user/follow-user'
import { Storage } from '@ionic/storage';
import { SharePostProvider } from '../../providers/share-post/share-post'

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
user:any;
uId;
Posts:any[];
userImage;
followingStatus;
AuthId;

  constructor(public navCtrl: NavController, public navParams: NavParams, public getUserInfoService : GetUserInfoProvider
  ,public getUserOwnPostsService :GetUserOwnPostsProvider, public storeCommentService: StoreCommentProvider,
   public storeLikeService : StoreLikeProvider,public followUserService: FollowUserProvider, public storage : Storage,
   public alertCtrl: AlertController,public loadingCtrl: LoadingController ,public modalCtrl: ModalController,
   public sharePostService: SharePostProvider, public popoverCtrl: PopoverController,)
   {
    
    storage.get('Auth').then((val) => {
      this.AuthId = val.authId;
    })

    this.uId = this.navParams.get('uId');
    console.log(this.uId);

    //Getting user information from users table
    this.getUserInfoService.getInfo(this.uId).subscribe(data=>{
      this.user = data.userInfo;
      this.userImage= data.userInfo.image_path;
      this.followingStatus = data.followingStatus;
      console.log(data);
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

  followUser(userId)
  {
    this.followUserService.follow(this.AuthId, userId).subscribe(data=>{
      console.log(data.status);                 
      console.log('userId which you follow------------' + userId);
      console.log('your user id -----------' + this.AuthId);
    })
  }

  unFollowUser(userId) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure ? ',
      message: 'You wanna unfollow ' + this.user.name +'.',
      buttons: [
        {
          text: 'Cancle',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Unfollow',
          handler: () => {
            console.log('Agree clicked');
            this.followUserService.follow(this.AuthId, userId).subscribe(data=>{
              console.log(data.status);                 
              console.log('userId which you follow------------' + userId);
              console.log('your user id -----------' + this.AuthId);
            });
          }
        }
      ]
    });
    confirm.present();

  }

 


  editPost(post){
    this.navCtrl.push('PostEditPage',{
      post:post
    });
  }

  sharePost(postId){
    this.sharePostService.share(postId , this.AuthId).subscribe(res=>{
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

goToUserProfilePage(userId){
  this.navCtrl.push('UserProfilePage',{
    uId : userId
  });
}


}
