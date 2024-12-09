// import { Injectable } from "@angular/core";
// import { HttpClient, HttpParams } from "@angular/common/http";
// import { Observable, throwError } from "rxjs";

// import { ErrorHandler } from "app/app.error-handler";
// import { catchError, map } from 'rxjs/operators';


// import { Restaurant } from "./restaurant/restaurant.model";
// import { Reviews } from "../restaurant-detail/reviews/reviews.model"
// import { MEAT_API } from 'app/app.api';
// import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

// @Injectable()
// export class RestaurantsService {

//   constructor(private http: HttpClient) { }

//   /**
//  * Retorna a lista de todos os restaurantes
//  */

//   restaurants(): Observable<Restaurant[]> {
//     return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`)
//       .pipe(
//         catchError((error) => ErrorHandler.handleError(error))
//       );
//   }

//   /**
//    * Retorna um restaurante específico pelo ID
//    * @param id ID do restaurante
//    */

//   restaurantById(id: string): Observable<Restaurant> {
//     return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
//       .pipe(
//         catchError((error) => ErrorHandler.handleError(error))
//       );
//   }
//   /**
//    * Retorna as avaliações de um restaurante específico pelo ID
//    * @param id ID do restaurante
//    */
//   reviewsOfRestaurant(id: string): Observable<any>  {
//     console.log(id)
//     return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
//   }

//   menuOfRestaurants(id: string): Observable<MenuItem[]> {
//     return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
//       .pipe(
//         map(items => items || []), // Garante que retorna um array vazio caso seja undefined ou null
//         catchError(error => {
//           console.error('Erro ao carregar itens do menu:', error);
//           return throwError(() => new Error('Erro ao carregar o menu. Tente novamente mais tarde.'));
//         })
//       );
//   }
// }


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable, of , throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { ErrorHandler } from '../app.error-handler';

// import { Restaurant } from "./restaurant/restaurant.model";
// import { Reviews } from "../restaurant-detail/reviews/reviews.model"
// import { MEAT_API } from 'app/app.api';
// import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";
// import { errorHandler } from '@angular/platform-browser/src/browser';

// @Injectable({
//   providedIn: 'root',
// })
// export class RestaurantsService {
//   constructor(private http: HttpClient) {}

//   restaurants(search?: string): Observable<Restaurant[]> {
//     let params = new HttpParams();
//     if (search) {
//       params = params.set('q', search);
//     }

//     return this.http
//       .get<Restaurant[]>(`${MEAT_API}/restaurants`, { params })
//       .pipe(
//         catchError(error => {
//           console.error('Erro ao buscar restaurantes', error); // Log do erro
//           return of([]);  // Retorna um array vazio se ocorrer um erro
//         })
//       );
//   }

//   restaurantById(id: string): Observable<any> {
//     return this.http
//       .get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
//       .pipe(
//         catchError(error => {
//           console.error('Erro ao buscar restaurantes', error); // Log do erro
//           return of([]);  // Retorna um array vazio se ocorrer um erro
//         })
//       );
//   }

//   reviewsOfRestaurant(id: string): Observable<any> {
//     return this.http.get<any>(`${MEAT_API}/restaurants/${id}/reviews`)
//       .pipe(
//         catchError(error => {
//           console.error('Erro ao obter as avaliações', error);
//           return of([]); // Retorna um array vazio em caso de erro
//         })
//       );
//   }
//   menuOfRestaurants(restaurantId: string): Observable<MenuItem[]> {
//     console.log(`Buscando menu para o restaurante ${restaurantId}`);
//     return this.http.get<MenuItem[]>(`api/restaurants/${restaurantId}/menu`)
//       .pipe(
//         catchError(error => {
//           console.error('Erro na requisição:', error);  // Verifique se há erro na requisição
//           return of([]);  // Retorne um array vazio em caso de erro
//         })
//       );
// }}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Restaurant } from './restaurant/restaurant.model';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';

import { MEAT_API } from '../app.api';
import { ErrorHandler } from '../app.error-handler';

@Injectable({
  providedIn: 'root', // Registro automático no Angular
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  // Obter lista de restaurantes
  restaurants(search?: string): Observable<Restaurant[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('q', search);
    }
    return this.http
      .get<Restaurant[]>(`${MEAT_API}/restaurants`, { params })
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Obter restaurante por ID
  restaurantById(id: string): Observable<Restaurant> {
    return this.http
      .get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Obter reviews de um restaurante
  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http
      .get<any>(`${MEAT_API}/restaurants/${id}/reviews`)
      .pipe(catchError(ErrorHandler.handleError));
  }

  // Obter menu de um restaurante
  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http
      .get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
      .pipe(catchError(ErrorHandler.handleError));
  }
}
