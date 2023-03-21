import {Directive, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Content} from "./Content";
import {Subscription, take} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {HttpService} from "../services/http.service";
import {PaginatorParams, QueryParams} from "../model/QueryParams";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {DataPage} from "../model/DataPage";

@Directive({
  selector: '[appContent]'
})
export class ContentDirective implements Content<QueryParams, DataPage>, OnInit {

  url!: string;
  dataSource: MatTableDataSource<DataPage>;
  input!: string;
  displayedColumns!: string[];
  filter: boolean = false;

  paginatorParams: PaginatorParams = {
    totalPages: 0,
    count: 0
  };

  queryParams: QueryParams = {
    offset: 0,
    limit: 10,
    reverse: true,
    property: '',
    search: ''
  }

  @ViewChild('inputElement', {read: ElementRef})
  inputElement: ElementRef

  constructor(private service: HttpService) {
  }

  ngOnInit(): void {
    this.getData(this.queryParams, this.url);
  }

  getData(queryParams: QueryParams, url: string): Subscription {
    return this.service.getAll(this.queryParams, url)
      .pipe(take(1))
      .subscribe(
        {
          next: (data: any) => {
            this.dataSource = new MatTableDataSource(data.content);
            this.paginatorParams.totalPages = data.totalPages;
            this.paginatorParams.count = data.count;
          }
        }
      );
  }

  applyFilter(): void {
    this.getData(this.queryParams, this.url);
  }

  applyInput(event: Event): void {
    this.queryParams.search = (event.target as HTMLInputElement).value;
    this.queryParams.offset = 0;
    this.getData(this.queryParams, this.url);
  }

  clearInput(): void {
    this.input = '';
    this.queryParams.search = this.input;
    this.queryParams.offset = 0;
    this.getData(this.queryParams, this.url);
  }

  pageChanged(event: PageEvent): void {
    this.queryParams.offset = event.pageIndex;
    this.queryParams.limit = event.pageSize;
    this.getData(this.queryParams, this.url);
  }

  sortChanged(event: Sort): void {
    this.queryParams.property = event.active;
    this.queryParams.reverse = event.direction == 'asc';
    this.getData(this.queryParams, this.url);
  }


  showFilter(): void {
    this.filter = !this.filter;
    if (this.filter) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus()
      }, 100);
    }
  }

}
