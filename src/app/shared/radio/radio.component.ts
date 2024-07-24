import { Component, OnInit, Input, Output ,forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { RadioOption } from './radio-option.model';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent) ,
      multi: true

    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[]

 



  value: any
  onChange: any


  constructor() { }

  ngOnInit() {
  }

  setValue(value: any){
    console.log('valor', value)
    this.value = value
    this.onChange(this.value)
  }

  
  writeValue(obj: any): void{
    this.value = obj
  }
 

  registerOnChange(fn: any): void{
    this.onChange = fn
  }

  
  
  registerOnTouched(fn: any): void{

  }
  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
  //  
   */
  setDisabledState?(isDisabled: boolean): void{

  }

}
