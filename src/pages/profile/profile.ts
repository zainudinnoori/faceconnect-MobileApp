import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,PopoverController,ModalController,ToastController } from 'ionic-angular';
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
userImage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public getUserInfoService : GetUserInfoProvider,public getUserOwnPostsService : GetUserOwnPostsProvider,
    public storeLikeService: StoreLikeProvider,public storeCommentService: StoreCommentProvider , public postCrudService: PostCrudProvider,
    public sharePostService: SharePostProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController , 
    public popoverCtrl: PopoverController, public modalCtrl : ModalController , public toastCtrl: ToastController) {
    this.AuthId =  this.navParams.get('AuthId');


    this.getUserInfoService.getInfo(this.AuthId).subscribe(data=>{
      this.user = data.userInfo;
      this.userImage = data.userInfo.image_path
    })

    this.getUserOwnPostsService.getPosts(this.AuthId).subscribe(data=>{
      this.Posts = data.posts;
      console.log(data.posts);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  likePost(postId){
    // if(this.state === 'liked' ? this.state='unliked' : this.state='liked')
    // if(this.likeButtonColor  == true ? this.likeButtonColor = false : this.likeButtonColor = true )
    this.storeLikeService.store(postId, this.AuthId).subscribe(res=>{
      console.log('done' + res.status);
    })
  }


  goToFollowers(){
    this.navCtrl.push('FollowersPage',{
      userId: this.AuthId
    });
  }

  goToFollowings(){
    this.navCtrl.push('FollowingsPage',{
      userId: this.AuthId
    });
  }

  goToAllImagesPage(){
    this.navCtrl.push('PhotosPage',{
      userId: this.AuthId
    })
  }

  goToSinglePost(postId){
    this.navCtrl.push('SinglePostPage',{
      postId: postId
    });
  }

  goToSubmitPostPage(){
    this.navCtrl.push('SubmitPostPage',{
      AuthId: this.AuthId
    });
  }

  
  editPost(post){
    this.navCtrl.push('PostEditPage',{
      post:post
    });
  }


  openLikesModal(pId:number){
    let likeModal = this.modalCtrl.create('LikesModalPage',{pId : pId});
    likeModal.present();
  }

  openCommentsModal(pId:number){
    let commentModal = this.modalCtrl.create('CommentsmodalPage',{pId : pId});
    commentModal.present();
    
}

showConfirm(postId) {
  let confirm = this.alertCtrl.create({
    title: 'Are you sure ? ',
    message: 'You want to delete this post, you will be no longer to bring it back.',
    buttons: [
      {
        text: 'Cancle',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Delete',
        handler: () => {
          console.log('Agree clicked');
          this.postCrudService.deletePost(postId,this.AuthId).subscribe(res=>{
            console.log(res);
            let toast = this.toastCtrl.create({
              message: 'Post deleted successfully',
              duration: 3000,
              position: 'top'
              });
              toast.present();
            
          })
        }
      }
    ]
  });
  confirm.present();
}

  showPost(postId){
    this.navCtrl.push('PostEditPage');
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
  goToHomePage(){
    this.navCtrl.setRoot('CardsPage');
  }

  goTosettingsPage(){
    this.navCtrl.push('SettingsPage');
  }

  goToUpdateInfoPage()
  {
    this.navCtrl.push('UpdateInfoPage');
  }
  goToUserProfilePage(userId){
    this.navCtrl.push('UserProfilePage',{
      uId : userId
    });
  }
}



