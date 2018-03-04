import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items, User } from '../../providers/providers';
import { GetFollowingsProvider } from '../../providers/get-followings/get-followings'
import { NavParams } from 'ionic-angular/navigation/nav-params';



@IonicPage()
@Component({
  selector: 'page-followings',
  templateUrl: 'followings.html',
})
export class FollowingsPage {
  currentItems: Item[];
  user : User;
  followings: any[];
  userId;
  // followingss:string[] = this.followings[name];


  constructor(public navCtrl: NavController,public navParams: NavParams, public items: Items, public modalCtrl: ModalController, public getFollowingsService: GetFollowingsProvider) {
    this.currentItems = this.items.query();
    this.userId = this.navParams.get('userId');
  
    this.getFollowingsService.getFollowings(this.userId).subscribe(data=>{
      this.followings= data.followings;
      console.log(this.followings.length)

    })

    
  }


  goToUserProfilePage(Uid:number){
    this.navCtrl.push('UserProfilePage',{
      Uid : Uid
    });
  }

  initializeItems() {
    this.getFollowingsService.getFollowings(this.userId).subscribe(data=>{
      this.followings= data.followings;
      console.log(this.followings.length)
    })
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.followings = this.followings.filter((followings) => {
        // console.log(followings.name)
        return (followings.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
