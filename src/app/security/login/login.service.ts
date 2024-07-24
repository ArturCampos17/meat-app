import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MEAT_API } from "app/app.api";
import { NavigationEnd, Router } from "@angular/router";

import { User } from "./user.model";

import {tap, filter } from 'rxjs/operators'


@Injectable()
export class LoginService{

    user: User
    lastUrl: string


    constructor(private http: HttpClient, private router: Router){
        this.router.events.pipe(filter( e=> e  instanceof NavigationEnd))
                            .subscribe( (e: NavigationEnd) => this.lastUrl =  e.url)
    }

    isLoggedIn() : boolean {
        return this.user !== undefined}



    login(email: string, password: string): Observable<User>{
        return this.http.post<User>(`${MEAT_API}/users/authenticate`, {email: email, password: password}).pipe(tap(user => this.user = user))
             

    }


    register(name: string, email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/users`, {name:name, email: email, password: password });
    }

    
    handleLogin( path: string = this.lastUrl){
        this.router.navigate(['/login', btoa(path)])
    }

   
    
    logout(){
        this.user = undefined
    }
}