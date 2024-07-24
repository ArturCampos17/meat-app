
import { Component, Inject, Injectable, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CreateAccountService } from './create-account.service';
import  { NotificationService} from '../../shared/messages/notification.service'


@Component({
  selector: 'mt-create-account',
  templateUrl: './create-account.component.html'
})



@Injectable()
export class CreateAccountComponent implements OnInit {

  loginForm: FormGroup
  registerForm: FormGroup
  navigateTo: string
  constructor(
    private fb: FormBuilder,
    @Inject(LoginService) private loginService: LoginService,
    private createAccountService: CreateAccountService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
     private router: Router 
  ) { 
  }
  
  
  ngOnInit() {

    this.registerForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/')
  }

  register( newUser: any) {
   
    this.loginService.register(newUser.name, newUser.email, newUser.password).subscribe(
      user => {
        this.notificationService.notify(`User ${user.name} registered successfully!`);
        
        this.loginService.login(newUser.email, newUser.password).subscribe(
          loggedInUser => {
            this.notificationService.notify(`Bem-vindo ${loggedInUser.name}`);
            this.router.navigate([atob(this.navigateTo)]);
          },
          error => {
            this.notificationService.notify(error.error.message);
          }
        );
      },
      error => {
        this.notificationService.notify(error.error.message);
      }
    );
  }
  
}
