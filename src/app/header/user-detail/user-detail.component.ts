import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/security/login/login.service';
import { CreateAccountService } from 'app/security/create-account/create-account.service';
import { User } from 'app/security/login/user.model';



@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginService: LoginService,
              private createAccountService: CreateAccountService
  ) { }

  ngOnInit() {
  }

  user(): User {
    return this.loginService.user
  }

  isLoggedIn(): boolean{
    return this.loginService.isLoggedIn()
  }

  login(){
    this.loginService.handleLogin()
  }
  

  logout(){
    this.loginService.logout()
  }

  createAccount(){
    this.createAccountService.createAccount()
  }


}
