import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {PaginatorParams} from "../model/QueryParams";
import {MatTableDataSource} from "@angular/material/table";

export interface Content<Q, D> {
  queryParams: Q
  url: string;
  paginatorParams: PaginatorParams;
  dataSource: MatTableDataSource<D>;
  displayedColumns: string[];
  filter: boolean;

  getData(queryParams: Q, url: string): Subscription;

  sortChanged(event: Sort): void;

  pageChanged(event: PageEvent): void;

  openModal(slug: string, type: number): void;
}
