import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetNotificationsProvider } from '../../providers/get-notifications/get-notifications' 


@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  uId = localStorage.getItem('AuthId');
  notificationsCount;
  notifications;

  constructor(public navCtrl: NavController,public getNotificationsService: GetNotificationsProvider ) {

    this.getNotificationsService.notifications(this.uId).subscribe(res=>{
      this.notifications = res.notifications;
      this.notificationsCount = res.notifications.length;
      console.log(this.notifications)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

}
