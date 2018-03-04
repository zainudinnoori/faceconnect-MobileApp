import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };
 
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loginService: LoginProvider) {

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

    this.loginService.login(this.email, this.password, this.userId).subscribe(res => {
    this.navCtrl.setRoot('CardsPage');
    let toast = this.toastCtrl.create({
    message: 'Welcome to faceconnect',
    duration: 3000,
    position: 'top'
    });
    toast.present();
    localStorage.setItem('Auth',this.userId);
      
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

