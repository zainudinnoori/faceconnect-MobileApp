import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetUserPhotosProvider } from '../../providers/get-user-photos/get-user-photos';


@IonicPage()
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {
  photos = [];
  userId;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public getUserPhotosService: GetUserPhotosProvider
  ) {
    this.userId = this.navParams.get('userId');
    this.getUserPhotosService.getPhotos(this.userId)
    .subscribe(data=>{
      this.photos = data.photos;
      console.log(data)
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosPage');
  }

}
