import { Component, OnInit, Input } from '@angular/core';
import { Restaurant1 } from './restaurant1.model';
import {trigger, state, style, transition, animate} from '@angular/animations'

@Component({
  selector: 'restaurant1',
  templateUrl: './restaurant1.component.html',
  animations : [
    trigger('restaurantAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('400ms 0s ease-in-out')
      ])
    ])
  ]
})
export class Restaurant1Component implements OnInit {

  restaurantState = 'ready'

  @Input() restaurant1: Restaurant1

  constructor() { }

  ngOnInit() {
  }

}
