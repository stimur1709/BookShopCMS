import {Directive, OnInit} from '@angular/core';
import {Subscription, take} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {HttpService} from "../services/http.service";
import {PaginatorParams, QueryParams} from "../model/QueryParams";
import {DataPage} from "../model/DataPage";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "./modal/modal.component";

@Directive({
  selector: '[appContent]'
})
export class ContentPageDirective implements OnInit {

  url!: string;
  dataSource: MatTableDataSource<DataPage>;
  filter: boolean = false;

  paginatorParams: PaginatorParams = {
    totalPages: 0,
    totalElements: 0
  };

  queryParams: QueryParams = {
    offset: 0,
    limit: 10,
    reverse: true,
    property: null,
    search: null
  }

  constructor(private service: HttpService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): Subscription {
    return this.service.getContents(this.url, this.queryParams)
      .pipe(take(1))
      .subscribe(
        (data) => {
          console.log(data.content)
          this.dataSource = new MatTableDataSource(data.content)
          this.paginatorParams.totalPages = data.totalPages
          this.paginatorParams.totalElements = data.totalElements
        }
      )
  }

  delete(event: number) {
    this.service.delete(this.url, event).subscribe(
      () => {
        this.getData();
      }
    );
  }

  openModal($event: {}) {
    const dialogRef = this.dialog.open(ModalComponent, {data: $event})

    dialogRef.afterClosed().subscribe(
      () => {
        this.getData();
      }
    )
  }

}
