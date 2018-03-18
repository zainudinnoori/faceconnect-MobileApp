import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UpdatePostProvider } from '../../providers/update-post/update-post'
import { LocalStorageService } from 'angular-web-storage/src/service';
import { Toast } from 'ionic-angular/components/toast/toast';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-post-edit',
  templateUrl: 'post-edit.html',
})

export class PostEditPage {
  post:any;
  post_content:string;
  authId =  localStorage.getItem('AuthId')
  constructor(public navCtrl: NavController, public navParams: NavParams, public updatePostService: UpdatePostProvider , public toastCtrl: ToastController) {
    this.post = this.navParams.get('post');
    console.log(this.post.body)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostEditPage');
  }

  updatePost(postId){
    console.log(this.post_content)
    this.updatePostService.update(this.authId, postId, this.post_content).subscribe(res=>{
      let toast = this.toastCtrl.create({
        message: 'Post updated successfully.',
        duration: 3000,
        position: 'top'
        });
        toast.present();
    })
  }

  dismiss(){
    this.navCtrl.pop();
  }
}
