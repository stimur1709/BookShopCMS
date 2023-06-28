import {Directive, EventEmitter, Input, Output} from '@angular/core';

@Directive({
  selector: '[appQueryParam]'
})
export class QueryParamDirective {

  @Input() queryParams: any
  @Output() queryParamsChange = new EventEmitter<any>();

  protected change(): void {
    this.queryParamsChange.emit(this.queryParams)
  }
}
