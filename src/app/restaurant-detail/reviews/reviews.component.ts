import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'app/restaurant/restaurant.service';
import {trigger, state , style, transition, animate, animateChild} from '@angular/animations'

import { Observable } from 'rxjs';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  animations : [
    trigger('reviewAppeared', [
      state('appereaded', 
        style({ opacity: 1})),
        transition( 'void => ready',
          [style({opacity: 0, transform: 'translateY( -20px)'}),
            animate('500ms 0s ease-in')])
    ])

  ]
})
export class ReviewsComponent implements OnInit {

  reviewState = 'ready'

  reviews: Observable<any>

  constructor(private restaurantService: RestaurantService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantService
    .reviewsOfRestaurant(this.route.parent.snapshot.params['id'])

  }

}
