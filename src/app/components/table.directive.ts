import {Directive, Input} from '@angular/core';
import {Sort} from "@angular/material/sort";
import {QueryParamDirective} from "./query-param.directive";
import {PaginatorParams, QueryParams} from "../model/QueryParams";
import {MatTableDataSource} from "@angular/material/table";
import {DataPage} from "../model/DataPage";
import {ModalComponent} from "../pages/modal/modal.component";
import {MatDialog} from "@angular/material/dialog";

@Directive({
  selector: '[appTable]'
})
export class TableDirective<Q extends QueryParams> extends QueryParamDirective<Q> {

  @Input()
  dataSource: MatTableDataSource<DataPage>

  @Input()
  paginatorParams: PaginatorParams

  displayedColumns!: string[]

  constructor(public dialog: MatDialog) {
    super()
  }

  sortChanged(event: Sort): void {
    this.queryParams.property = event.active
    this.queryParams.reverse = event.direction == 'asc'
    this.change()
  }

  pageChanged(): void {
    this.change()
  }

  openModal(slug: string, type: number): void {
    this.dialog.open(ModalComponent, {
      data: {
        type: type,
        slug: slug
      }
    })
  }

}
