import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController } from 'ionic-angular';
import { PostLikesCommentsProvider } from '../../providers/post-likes-comments/post-likes-comments'
import { StoreCommentProvider } from '../../providers/store-comment/store-comment';
import { Response } from '@angular/http/src/static_response';



@IonicPage()
@Component({
  selector: 'page-commentsmodal',
  templateUrl: 'commentsmodal.html',
})
export class CommentsmodalPage {
  comments: any[];
  pId : number;
  commentCount: number;
  AuthId; 
  AuthName;
  commentBody ='';
  @ViewChild('content') content:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postLikesCommentsService: PostLikesCommentsProvider,
  public viewCtrl : ViewController, public storeCommentService: StoreCommentProvider){

    this.pId = navParams.get('pId');
    this.postLikesCommentsService.getComments(this.pId).subscribe(res =>{
      this.comments = res.comments;
      this.commentCount = res.comments.length;
      this.AuthName = localStorage.getItem('AuthName');
      this.AuthId = localStorage.getItem('AuthId');
      
      console.log(res);
  });

  }
  

  ionViewDidLoad() {
  }

  ionViewDidEnter(){
    this.content.scrollToBottom(500);//300ms animation speed
  }

  dismiss()
  {
    this.viewCtrl .dismiss(this.comments);
  }

  
  onSubmit(form){

    let comment  = 
      {
        "post_id": this.pId,
        "body": form.value.commentBody,
        "created_at":Date(),
        "comment_user": {
          "id": this.AuthId,
          "name": this.AuthName,
          "image": "586ad521b9545ab3e5d1accab3e49d7c.jpg"
          }
      }

    this.comments.push(comment);
    this.commentBody ="";
    this.content.scrollToBottom(500);//300ms animation speed    
    this.storeCommentService.storeComment(form.value.postId,form.value.commentBody, this.AuthId).subscribe(res=>{
      console.log(res.status);
    })
  }
  goToUserProfilePage(userId){
    this.navCtrl.push('UserProfilePage',{
      uId : userId
    });
  }

}
