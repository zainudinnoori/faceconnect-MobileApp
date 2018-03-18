import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PostLikesCommentsProvider } from '../../providers/post-likes-comments/post-likes-comments'
import { StoreCommentProvider } from '../../providers/store-comment/store-comment';



@IonicPage()
@Component({
  selector: 'page-commentsmodal',
  templateUrl: 'commentsmodal.html',
})
export class CommentsmodalPage {
  comments : any[];
  pId : number;
  commentCount: number;
  AuthId; 
  constructor(public navCtrl: NavController, public navParams: NavParams, public postLikesCommentsService: PostLikesCommentsProvider,
  public viewCtrl : ViewController, public storeCommentService: StoreCommentProvider){

    this.pId = navParams.get('pId');
    this.postLikesCommentsService.getComments(this.pId).subscribe(res=>{
      this.comments = res.comments;
      this. commentCount = res.comments.length;
      this. AuthId = localStorage.getItem('AuthId');
      console.log(res);
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsmodalPage');
  }
  dismiss()
  {
    this.viewCtrl .dismiss(this.comments);
  }

  onSubmit(form){
    this.storeCommentService.storeComment(form.value.postId,form.value.commentBody, this.AuthId).subscribe(res=>{
      console.log(res.status);
      // form.commentBody.value="";
    })
    // console.log(form.value.postId,form.value.commentBody);
  }
}
