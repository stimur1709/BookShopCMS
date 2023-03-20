import {Component, Input} from '@angular/core';
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
export class ContentComponent<T> implements Content {

  public queryParams: QueryParams = {
    offset: 0,
    limit: 10,
    reverse: true,
    property: '',
    search: ''
  }

  public paginatorParams: PaginatorParams = {
    totalPages: 0,
    count: 0
  }

  @Input() url!: string;
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns!: string[];

  constructor(private service: HttpService) {
  }

  getData(queryParams: QueryParams, url: string): Subscription {
    console.log(queryParams)
    return this.service.getAll(this.queryParams, url)
      .pipe(take(1))
      .subscribe(
        {
          next: (data: AuthorPage) => {
            console.log(data);
            this.dataSource = new MatTableDataSource(data.content);
            console.log(data.totalPages);
            this.paginatorParams.totalPages = data.totalPages;
            console.log(data.count);
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
