import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController ,NavParams } from 'ionic-angular';
import { PostLikesCommentsProvider } from '../../providers/post-likes-comments/post-likes-comments'


@IonicPage()
@Component({
  selector: 'page-likes-modal',
  templateUrl: 'likes-modal.html',
})
export class LikesModalPage {

  pId : number;
  likes: any;
  likesCount:number;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController ,public navParams: NavParams ,public postLikesCommentsService : PostLikesCommentsProvider
  ) {
    
    this.pId = navParams.get('pId');

    this.postLikesCommentsService.getLikes(this.pId).subscribe(res=>{
      this.likes = res.likes;
      this.likesCount= this.likes.length;
      console.log(res);
    })

  }

  dismiss()
  {
    this.viewCtrl .dismiss(this.likes);
  }

  goToUserProfilePage(uId){
    // this.viewCtrl .dismiss(this.likes);
      this.navCtrl.push('UserProfilePage',{
      uId:uId
    })
  }

}
