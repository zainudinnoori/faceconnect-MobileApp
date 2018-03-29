import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

 
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loginService: LoginProvider,
    public storage : Storage,
  ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }


  ionViewLoad(){
    console.log('ionViewload');
  }
  email:string;
  password:string;
  userId:string;


  // Attempt to login in through our User service
doLogin(value: any): void {

    this.loginService.login(this.email, this.password).subscribe(res => {
    this.navCtrl.setRoot('CardsPage');
    let toast = this.toastCtrl.create({
    message: 'Welcome to faceconnect',
    duration: 3000,
    position: 'top'
    });
    toast.present();
    this.storage.set('Auth', res);
    this.storage.get('Auth').then((val) => {
      console.log(val)      
    })

    localStorage.setItem('AuthId',res.authId);
    localStorage.setItem('AuthName',res.authName);
    // console.log(res);    
    // console.log(localStorage.getItem('AuthId'));
    // console.log(localStorage.getItem('AuthName'));
    
 },err => {
      let toast = this.toastCtrl.create({
      message: err,
      duration: 3000,
      position: 'top'
      });
      toast.present();
 })
}

  // doLogin() {
  //   this.user.login(this.account).subscribe((resp) => {
  //     this.navCtrl.setRoot(MainPage);
  //   }, (err) => {
  //     this.navCtrl.setRoot(MainPage);
  //     // Unable to log in
  //     let toast = this.toastCtrl.create({
  //       message: this.loginErrorString,
  //       duration: 3000,
  //       position: 'top'
  //     });
  //     toast.present();
  //   });
  // }
}

