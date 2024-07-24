import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import  { NotificationService} from '../../shared/messages/notification.service'



@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  registerForm: FormGroup
  navigateTo: string

  constructor(private fb: FormBuilder,
     private loginService: LoginService,
     private notificationService: NotificationService,
     private activatedRoute: ActivatedRoute,
     private router: Router ) { }

  ngOnInit() {

    this.loginForm= this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })

   
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/')
  }

  login(user: any){
    this.loginService.login(user.email, 
                            user.password).subscribe(user => {
                              this.notificationService.notify(`Bem-vindo ${user.name}`);
                            }, error => {
                              this.notificationService.notify(error.error.message);
                            }, () => {
                              this.router.navigate([atob(this.navigateTo)]);
                            })
  }

  

}
