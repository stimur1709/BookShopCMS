import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {QueryParams} from "../model/QueryParams";

@Directive({
  selector: '[appQueryParam]'
})
export class QueryParamDirective<Q extends QueryParams> {

  @Input()
  queryParams: any

  @Output()
  queryParamsChange = new EventEmitter<any>();

  constructor() {
  }

  protected change() : void {
    console.log(this.queryParams);
    this.queryParamsChange.emit(this.queryParams)
  }
}
