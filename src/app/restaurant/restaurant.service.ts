import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";


import { Restaurant1 } from "./restaurant1/restaurant1.model";

import { MEAT_API } from "../app.api";

import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";
import { Reviews } from "app/restaurant-detail/reviews/reviews.model";


type RestaurantsList = {_links: any, item: Restaurant1[]}
type RestaurantReviewList = {_links: any, item: Reviews[]}

@Injectable()
export class RestaurantService{              
    constructor(private http: HttpClient){}

    restaurant(search?: string): Observable<RestaurantsList>{
        let params: HttpParams = undefined
        if(search){
            params = new HttpParams().append('q', search)
        }

        return this.http.get<RestaurantsList>(`${MEAT_API}/restaurants`, {params: params})
    }


    restaurant1ById(id: any): Observable<Restaurant1>{
        return this.http.get<Restaurant1>(`${MEAT_API}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<RestaurantReviewList[]>{
        return this.http.get<RestaurantReviewList[]>(`${MEAT_API}/restaurants/${id}/reviews`)
    }


    menuOfRestaurant(_id: any): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${_id}/menu`)
    }


       
    
}