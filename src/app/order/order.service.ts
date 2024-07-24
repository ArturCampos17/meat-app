import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders } from '@angular/common/http'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import { LoginService } from 'app/security/login/login.service'
import {ShoppingCartService} from '../restaurant-detail/shopping-cart/shopping-cart.service'
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model'
import {Order, OrderItem} from './order.model'
import { MEAT_API } from 'app/app.api'



@Injectable()
export class OrderService{


    constructor(private cartService: ShoppingCartService, private http: HttpClient, private loginService: LoginService){}


    itemsValue(): number {
        return this.cartService.total()
    }

    cartItems(): CartItem[]{
        return this.cartService.items
    }

    increaseQty(item:CartItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item:CartItem){
        this.cartService.decreaseQty(item)
    }

    remove(item: any){
        this.cartService.removeItem(item)

    }

    clear(){
        this.cartService.clear()
    }

    checkOrder(order: Order): Observable<string>{
        let header = new HttpHeaders()
        if(this.loginService.isLoggedIn()){
            header = header.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: header})
            .pipe(map(order => order._id))


    }


}