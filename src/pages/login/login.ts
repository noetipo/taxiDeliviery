import { Component } from '@angular/core';
import {IonicPage, NavController, LoadingController, AlertController, MenuController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import {RegisterPage} from "../register/register";
import {TabsPage} from "../tabs-page/tabs-page";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm: any;
  public backgroundImage: any = "./assets/bg1.png";
  public imgLogo: any = "./assets/medium_150.70391061453px_1202562_easyicon.net.png";

  constructor(   public menu: MenuController, public navCtrl: NavController,  public fb: FormBuilder, public alertCtrl: AlertController,public loadingCtrl: LoadingController,
            ) {
    this.menu.enable(false);
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  login(){
    if (!this.loginForm.valid){
      //this.presentAlert('Username password can not be blank')
      console.log("error");
    } else {
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: ''
      });
      loadingPopup.present();


    }

    this.navCtrl.push(TabsPage);
  }

  forgot(){
    this.navCtrl.push('ForgotPage');
  }

  createAccount(){
    this.navCtrl.push(RegisterPage);
  }
  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }

}
