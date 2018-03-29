import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController,LoadingController,PopoverController,ToastController } from 'ionic-angular';
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
// import { GetNotificationsProvider } from '../../providers/get-notifications/get-notifications' 
import { Storage } from '@ionic/storage';
 
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
  AuthId;
  posts : Post[];
  postsCount:number;
  commentBody : string;
  state : string = "unliked";
  likeButtonColor : boolean = true;
  notificationsCount;
 

  constructor(
    public navCtrl: NavController,public followingUsersPostService: FollowingUsersPostProvider,public modalCtrl: ModalController,
    public storeLikeService: StoreLikeProvider,public storeCommentService: StoreCommentProvider , public postCrudService: PostCrudProvider,
    public sharePostService: SharePostProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController , 
    public popoverCtrl: PopoverController, public storage : Storage, public toastCtrl: ToastController,
    ){

        

      storage.get('Auth').then((val) => {
        if(val == '')
        {
            this.navCtrl.setRoot('LoginPage');
            let alert = this.alertCtrl.create({
              title: 'Oops...',
              subTitle: 'It looks you are not logged in',
              buttons: ['Login']
            });
            alert.present();

        }
        else
        {
          let loader = this.loadingCtrl.create({
            content: "Getting your posts..."
          }); 
          loader.present();  
          let uId = val.authId
          this.AuthId = uId;
          this.followingUsersPostService.posts(uId).subscribe(data => {
            this.posts = data.posts;
            this.postsCount= data.posts.length;
            loader.dismiss();
          });
          // console.log('Your Auth are', val);
          // console.log('Your posts count is :', this.posts);
        }
      });

      // this.getNotificationsService.notifications(this.AuthId).subscribe(res=>{
      //   this.notificationsCount = res.notifications.length;
      // })
 
  
  }

  presentPopover() {
    let popover = this.popoverCtrl.create('HomePopOverPage');
    popover.present();
  }


  goToNotifications(){
    this.navCtrl.push('NotificationsPage');
  }


  goToProfilePage(){
    this.navCtrl.push('ProfilePage',{
      AuthId : this.AuthId
    });
  }


  goToSinglePost(postId){
    this.navCtrl.push('SinglePostPage',{
      postId: postId,
      AuthId:this.AuthId
    });
  }

  goToUserProfilePage(userId){
    this.navCtrl.push('UserProfilePage',{
      uId : userId
    });
  }


  goToSubmitPostPage(){
    this.navCtrl.push('SubmitPostPage',{
      AuthId: this.AuthId
    });
  }

  likePost(postId){
    // if(this.state === 'liked' ? this.state='unliked' : this.state='liked')
    // if(this.likeButtonColor  == true ? this.likeButtonColor = false : this.likeButtonColor = true )
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


  editPost(post){
    this.navCtrl.push('PostEditPage',{
      post:post
    });
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
            this.navCtrl.setRoot('CardsPage');
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

logout(){
  this.storage.set('Auth', ''); 
  this.navCtrl.setRoot('LoginPage'); 
}

  
}
