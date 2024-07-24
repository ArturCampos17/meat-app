import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestaurantService } from 'app/restaurant/restaurant.service';
import { Restaurant1 } from 'app/restaurant/restaurant1/restaurant1.model';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant1: Restaurant1

  constructor(private restaurantService : RestaurantService, private route: ActivatedRoute ) { }

  ngOnInit() {

    this.restaurantService.restaurant1ById(this.route.snapshot.params['id'])
    .subscribe(restaurant1 => this.restaurant1 = restaurant1)
  }

}
