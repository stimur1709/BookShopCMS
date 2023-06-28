import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {Sort} from "@angular/material/sort";
import {QueryParamDirective} from "./query-param.directive";
import {PaginatorParams} from "../model/QueryParams";
import {MatTableDataSource} from "@angular/material/table";

@Directive({
  selector: '[appTable]'
})
export class TableDirective extends QueryParamDirective {

  @Input() dataSource: MatTableDataSource<any>
  @Output() dataSourceChange = new EventEmitter<number>();
  @Output() modalChange = new EventEmitter<{}>();
  @Input() paginatorParams: PaginatorParams
  displayedColumns!: string[]

  sortChanged(event: Sort): void {
    this.queryParams.property = event.active
    this.queryParams.reverse = event.direction == 'asc'
    this.change()
  }

  openModal(element: any, type: number): void {
    this.modalChange.emit({slug: element.slug, type: type})
  }

  delete(id: number) {
    this.dataSourceChange.emit(id)
  }

}
