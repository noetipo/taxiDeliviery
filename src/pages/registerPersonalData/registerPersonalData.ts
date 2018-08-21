import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, AlertController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import {TaxiDeliveryService} from "../../providers/taxi-delivery.service";
import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-register-personal-data',
  templateUrl: 'registerPersonalData.html'
})
export class RegisterPage {
  public registerForm;
  public backgroundImage: any = "./assets/bg1.png";


  private dataUpdate: any = {};



  constructor(public storage: Storage, public nav: NavController, public fb: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private service: TaxiDeliveryService) {

    this.registerForm = fb.group({
      documento_identidad: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      tipo_usuario: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      direccion: ['', Validators.compose([Validators.minLength(5), Validators.required])],
    });

  }


  registerUser() {

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
