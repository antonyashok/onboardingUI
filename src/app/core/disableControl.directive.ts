import { NgControl } from '@angular/forms';
import { Directive, ElementRef, HostListener,Input } from '@angular/core';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {

  @Input() set disableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }
  
  constructor( private ngControl : NgControl ) {
    
  }

}