import { Component, OnInit } from '@angular/core';
import { Restaurant1 } from './restaurant1/restaurant1.model';
import { RestaurantService } from './restaurant.service';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';




import {tap,switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'
import { Observable, from } from 'rxjs';






@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"

      })),
      transition('* => *', animate('250ms 0s ease-in-out'))

    ])
  ]
})
export class RestaurantComponent implements OnInit {

  searchBarState = 'hidden'
  restaurant: Restaurant1[]
  restaurantFilter: Restaurant1[]

  searchForm: FormGroup
  searchControl: FormControl

  
  constructor(private restaurantService: RestaurantService,
              private fb: FormBuilder ) { }

  ngOnInit() {
    this.doCreateSearchForm()
    this.doGetRestaurants()
  }

  doCreateSearchForm(){
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })
    this.doActiveSearchFilter()
  }

  doActiveSearchFilter(){
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(res => {
      this.doSetRestaurantsFilter({name:res})
      this.doSetRestaurantsFilterByCategory({category : res})
    })
  }

  doGetRestaurants(){
    this.restaurantService.restaurant().subscribe(restaurants => {
      this.restaurant = restaurants && restaurants.item
    }, resError => {

    }, () => {
      this.restaurantFilter = this.restaurant
    })
  }

  doSetRestaurantsFilter(filter: {name : string}){
    if(filter && filter.name){
      this.restaurantFilter = this.doFilterRestaurants(filter)
    }else{
      this.restaurantFilter = this.restaurant
    }
  }

  doSetRestaurantsFilterByCategory(filter: {category : string}){
    if(filter && filter.category){
      this.restaurantFilter = this.doFilterRestaurantsByCategory(filter)
    }else{
      this.restaurantFilter = this.restaurant
    }
  }

  doFilterRestaurantsByCategory(filters: { category: string }): Restaurant1[] {
    const restaurantFilter = this.restaurant.filter(restaurant => restaurant.category.toLowerCase().includes(filters.category.toLowerCase()))
    return restaurantFilter
  }


  doFilterRestaurants(filters: { name: string }): Restaurant1[] {
    const restaurantFilter = this.restaurant.filter(restaurant => restaurant.name.toLowerCase().includes(filters.name.toLowerCase()))
    return restaurantFilter
  }


  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
