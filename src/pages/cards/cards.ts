import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import {NotificationsPage} from '../notifications/notifications';
import { SinglePostPage } from '../single-post/single-post';
import { SubmitPostPage } from '../submit-post/submit-post';
import { Item } from 'ionic-angular/components/item/item';
import { SessionStorage } from 'angular-web-storage';
import { FollowingUsersPostProvider } from '../../providers/following-users-post/following-users-post'
import { ModalController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})

export class CardsPage {
  posts:any[];
  
  constructor(public navCtrl: NavController,public postsService: FollowingUsersPostProvider,public modalCtrl: ModalController) {
      // this.postsService.posts().subscribe(data => this.posts = data);

      this.postsService.posts().subscribe(data => {
        this.posts = data.fPosts;
        console.log('posts result: ', this.posts);

      });
      
  
  }


  
  goToNotifications(){
    this.navCtrl.push('NotificationsPage');
  }
  goToProfilePage(){
    this.navCtrl.push('ProfilePage');
  }
  goToSinglePost(userId){
    this.navCtrl.push('SinglePostPage',{
      item: userId
    });
  }

  openLikeModal(){
    let profileModal = this.modalCtrl.create({ userId: 8675309 });
    console.log('modal');
    profileModal.present();
  }

  SubmitPostPage(){
    this.navCtrl.push('SubmitPostPage');
  }

}
