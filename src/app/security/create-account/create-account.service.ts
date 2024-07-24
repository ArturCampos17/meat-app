import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MEAT_API } from "app/app.api";
import { NavigationEnd, Router } from "@angular/router";

import {newUser} from './new-user.model'
import {tap, filter } from 'rxjs/operators'

@Injectable()
export class CreateAccountService{

    newUser: string
    lastUrl: string;



    constructor(private http: HttpClient, private router: Router){
        this.router.events.pipe(filter( e=> e  instanceof NavigationEnd))
        .subscribe( (e: NavigationEnd) => this.lastUrl =  e.url)
    }

    register(name:string, email: string, password: string): Observable<any> {
        return this.http.post<any>(`${MEAT_API}/create`, {name:name, email: email, password: password });
    }

    createAccount(path:string = this.lastUrl){
        this.router.navigate(['/create'])
    }

    

   

    
    



}