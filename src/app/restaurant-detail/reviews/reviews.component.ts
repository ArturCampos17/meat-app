// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { RestaurantsService } from 'app/restaurants/restaurants.service';

// import { Observable } from 'rxjs';

// @Component({
//   selector: 'mt-reviews',
//   templateUrl: './reviews.component.html',

// })
// export class ReviewsComponent implements OnInit {

//   reviews : Observable<any>

//   constructor(private restaurantsService : RestaurantsService,
//               private route: ActivatedRoute) { }

//   ngOnInit() {
//       this.reviews = this.restaurantsService
//       .reviewsOfRestaurant(this.route.parent.snapshot.params['id'])

//     }

// }


import { Component, OnInit }  from '@angular/core';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {
  reviews: any[] = [];  // Certifique-se de que é um array.
  errorMessage: string | null = null;

  constructor(private restaurantService: RestaurantsService) {}

  ngOnInit(): void {
    const restaurantId = 'bread-bakery';  // Use um ID dinâmico conforme necessário.
    this.restaurantService.reviewsOfRestaurant(restaurantId).subscribe({
      next: (data) => {
        // Verifique o formato dos dados recebidos
        console.log('Dados recebidos:', data);
        if (Array.isArray(data)) {
          this.reviews = data;
        } else if (data && data.reviews) {
          // Caso o servidor retorne um objeto com a propriedade 'reviews'
          this.reviews = data.reviews;
        } else {
          this.reviews = [];  // Se não houver dados de avaliações, defina como array vazio
        }
      },
      error: (error) => {
        console.error('Erro ao carregar avaliações', error);
        this.errorMessage = 'Não foi possível carregar as avaliações.';
        this.reviews = [];
      }
    });
  }
}
