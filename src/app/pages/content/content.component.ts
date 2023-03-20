import {Component, Input, OnInit} from '@angular/core';
import {Content} from "../Content";
import {HttpService} from "../../services/http.service";
import {PaginatorParams, QueryParams} from "../../model/QueryParams";
import {Subscription, take} from "rxjs";
import {AuthorPage} from "../../model/DataPage";
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent<T> implements Content, OnInit {

  queryParams: QueryParams = {
    offset: 0,
    limit: 10,
    reverse: true,
    property: '',
    search: ''
  }

  paginatorParams: PaginatorParams = {
    totalPages: 0,
    count: 0
  }

  @Input() url!: string;
  @Input() displayedColumns!: string[];
  dataSource!: MatTableDataSource<any>;

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
          next: (data: AuthorPage) => {
            this.dataSource = new MatTableDataSource(data.content);
            this.paginatorParams.totalPages = data.totalPages;
            this.paginatorParams.count = data.count;
          }
        }
      );
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
}
