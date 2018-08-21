import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, AlertController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import {TaxiDeliveryService} from "../../providers/taxi-delivery.service";
import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public registerForm;
  public backgroundImage: any = "./assets/bg1.png";


  private dataUpdate: any = {};



  constructor(public storage: Storage, public nav: NavController, public fb: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private service: TaxiDeliveryService) {

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.registerForm = fb.group({

      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      username: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      first_name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      last_name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      password1: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password2: ['', Validators.compose([Validators.minLength(6), Validators.required])],

    });

  }


  registerUser() {


    this.dataUpdate = {
      username: this.registerForm.value.username,
      first_name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name
    };
    if (!this.registerForm.valid) {
      this.presentAlert("Sus Datos no son correctos");
    } else {
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Creando...'
      });
      loadingPopup.present();

      this.service.postDataRegister('rest-auth/registration/', this.registerForm.value).subscribe(data => {
        this.storage.set('token', data.key);
        this.storage.get('token').then((token) => {
            if (token) {
              this.service.putData('rest-auth/user/', '', this.dataUpdate, token).subscribe(data => {
                this.storage.set('user', data);

              });
            }

          }
        );
        loadingPopup.dismissAll();

      }, error => {

        console.log(error);
        loadingPopup.dismissAll();
      });

    }
  }


  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }
}
