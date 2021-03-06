import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {
  ResponseLogin,
  RequestLogin,
  ErrorResponseLogin,
  Oauth2Service
} from '@suite/services';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '@suite/services';

import { ToastController, AlertController } from '@ionic/angular';
import { AppInfo } from 'config/base';

@Component({
  selector: 'suite-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginComponent implements OnInit {
  user: RequestLogin = {
    username: 'admin@krackonline.com',
    password: 'ChangeMe.1234',
    grant_type: 'password'
  };

  constructor(
    private loginService: Oauth2Service,
    private router: Router,
    private authenticationService: AuthenticationService,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  login(user: RequestLogin) {
    console.log(user);
    this.loginService.post_login(user, AppInfo.Name.Sga).subscribe(
      (data: HttpResponse<ResponseLogin>) => {
        const response: ResponseLogin = data.body;
        console.log(response);
        this.authenticationService.login(data.body.data.access_token);
        this.router.navigate(['/home']);
      },
      (errorResponse: HttpErrorResponse) => {
        this.presentToast(errorResponse.message);
        console.log(errorResponse);
      }
    );
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 2750
    });
    toast.present();
  }

  async presentPasswordAlert() {
    const alert = await this.alertController.create({
      header: '¿Contraseña?',
      message: `Si has olvidado tu contraseña o no tienes acceso a tu perfil ponte en contacto con tu
        supervisor y él buscará cual es tu contraseña actual o te dará nuevos datos de acceso.`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
