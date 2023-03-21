import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {PaginatorParams} from "../model/QueryParams";
import {MatTableDataSource} from "@angular/material/table";
import {ElementRef} from "@angular/core";

export interface Content<Q, D> {
  queryParams: Q
  url: string;
  paginatorParams: PaginatorParams;
  input: string;
  dataSource: MatTableDataSource<D>;
  displayedColumns: string[];
  filter: boolean;
  inputElement: ElementRef;

  getData(queryParams: Q, url: string): Subscription;

  sortChanged(event: Sort): void;

  pageChanged(event: PageEvent): void;

  applyInput(event: Event): void;

  clearInput(): void;

  applyFilter(): void;

  showFilter(): void;

}
