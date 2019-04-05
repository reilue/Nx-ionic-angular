import { Component, OnInit } from '@angular/core';
import { UsersService, UserModel } from '@suite/services';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'suite-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  formInputs = {
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  };
  isLoading = false;
  title = 'Usuario Create Test';

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
    console.log(this.f);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    console.log('submitted');

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.presentLoading();
    const user: UserModel.User = {
      name: this.userForm.get('name').value,
      email: this.userForm.get('email').value,
      password: this.userForm.get('password').value
    };

    this.usersService
      .postStore(user)
      .then((data: Observable<HttpResponse<UserModel.ResponseStore>>) => {
        data.subscribe(
          (res: HttpResponse<UserModel.ResponseStore>) => {
            this.dismissLoading();
            this.router.navigate(['users']);
            this.presentToast(`Usuario ${res.body.data.name} creado`);
          },
          (errorResponse: HttpErrorResponse) => {
            this.dismissLoading();
            this.presentToast('Error - Errores no estandarizados');
          }
        );
      });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 3750
    });
    toast.present();
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        message: 'Un momento ...'
      })
      .then(a => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log('dismissed'));
  }
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
