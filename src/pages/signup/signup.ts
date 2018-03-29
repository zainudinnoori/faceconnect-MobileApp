import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { SignupProvider} from '../../providers/signup/signup';
import { Storage } from '@ionic/storage';

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
    public signUpService: SignupProvider,
    public storage : Storage,
    
  ) {
  
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
      this.signUpService.signUp(this.email, this.password, this.name, this.dob).subscribe(res => {
      // this.storage.set('Auth', res);
      this.navCtrl.setRoot('LoginPage');      
      let toast = this.toastCtrl.create({
        message: 'Registered Done, Welcome to faceconnect. Please login to your account.',
        duration: 5000,
        position: 'top'
        });
        toast.present();
        console.log(res)
        
   },err => {
        let toast = this.toastCtrl.create({
          message: 'It looks this email is already in used.',
          duration: 10000,
          position: 'top'
          });
          toast.present();
   })

    console.log(this.name+'-----' + this.email+'-----' +this.password+'-----' +this.dob);
  }
}
