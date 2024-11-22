import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'app/restaurants/restaurants.service';

import { Observable } from 'rxjs';
import { MenuItem } from '../menu-item/menu-item.model';
import { MenuItemComponent } from '../menu-item/menu-item.component';
@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>

  constructor(private restaurantsService: RestaurantsService,
    private route: ActivatedRoute) { }

  // ngOnInit() {

  //   this.menu = this.restaurantsService
  //     .menuOfRestaurants(this.route.parent.snapshot.params['id'])
  //     this.menu.subscribe(data => {
  //       console.log('Menu items:', data);  // Verifique os dados do menu
  //     });
  // }

  // addMenuItem(item: MenuItem){
  //   console.log(item)
  // }
  // ngOnInit() {
  //   const restaurantId = this.route.parent.snapshot.params['id'];
  //   console.log('Restaurant ID:', restaurantId);  // Verifique se está pegando a ID da rota corretamente

  //   this.menu = this.restaurantsService.menuOfRestaurants(restaurantId);

  //   console.log('Menu Observable:', this.menu);  // Verifique se o Observable está configurado

  //   this.menu.subscribe({
  //     next: (data) => {
  //       console.log('Menu items:', data);  // Verifique os dados do menu
  //     },
  //     error: (err) => {
  //       console.error('Erro ao carregar menu:', err);  // Verifique se há erros
  //     }
  //   });
  // }
  // }


  ngOnInit() {
    const restaurantId = this.route.parent.snapshot.params['id'];
    console.log('Restaurant ID:', restaurantId);

    // Dados mockados para testar a renderização, agora com todas as propriedades
    this.menu = new Observable<MenuItem[]>((observer) => {
      observer.next([
        {
          id: '1',
          name: 'Pão de Mel',
          description: 'Delicioso pão de mel com chocolate',
          price: 5.00,
          imagePath: 'assets/img/foods/bread.png'  // Caminho para a imagem
        },
        {
          id: '2',
          name: 'Bolo de Chocolate',
          description: 'Bolo de chocolate com recheio cremoso',
          price: 10.00,
          imagePath: 'assets/img/foods/cake.png'  // Caminho para a imagem
        }
      ]);
    });

    // Testando a emissão de dados mockados
    this.menu.subscribe({
      next: (data) => {
        console.log('Menu items (mockados):', data); // Verifique se os dados mockados estão sendo exibidos corretamente
      },
      error: (err) => {
        console.error('Erro ao carregar menu:', err);
      }
    });
  }

  addMenuItem(item: MenuItem) {
    console.log(item); // Lógica para adicionar o item ao carrinho ou outra funcionalidade
  }
}
