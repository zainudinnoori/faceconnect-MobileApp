import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { SignupProvider} from '../../providers/signup/signup';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

 name: string;
 email: string;
 password: string;
 dob:string;

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public signUpService: SignupProvider
    
  ) {
  
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
      this.signUpService.signUp(this.email, this.password, this.name, this.dob).subscribe(res => {
      this.navCtrl.setRoot('CardsPage');
      let toast = this.toastCtrl.create({
      message: 'Registered Done, Welcome to faceconnect',
      duration: 3000,
      position: 'top'
      });
      toast.present();
        
   },err => {
        let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'top'
        });
        toast.present();
   })

    console.log(this.name+'-----' + this.email+'-----' +this.password+'-----' +this.dob);
  }
}
