import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {Sort} from "@angular/material/sort";
import {QueryParamDirective} from "./query-param.directive";
import {PaginatorParams} from "../model/QueryParams";
import {MatTableDataSource} from "@angular/material/table";
import {ModalComponent} from "../pages/modal/modal.component";
import {MatDialog} from "@angular/material/dialog";

@Directive({
  selector: '[appTable]'
})
export class TableDirective extends QueryParamDirective {

  @Input() dataSource: MatTableDataSource<any>
  @Output() dataSourceChange = new EventEmitter<any>();
  @Input() paginatorParams: PaginatorParams
  displayedColumns!: string[]

  constructor(public dialog: MatDialog) {
    super()
  }

  sortChanged(event: Sort): void {
    this.queryParams.property = event.active
    this.queryParams.reverse = event.direction == 'asc'
    this.change()
  }

  openModal(element: any, type: number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        type: type,
        slug: element.slug
      }
    })

    dialogRef.afterClosed().subscribe(
      () => {
        this.change()
      }
    )
  }

}
