import {Directive, OnInit} from '@angular/core';
import {Subscription, take} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {HttpService} from "../services/http.service";
import {PaginatorParams, QueryParams} from "../model/QueryParams";
import {DataPage} from "../model/DataPage";

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

  constructor(private service: HttpService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): Subscription {
    return this.service.getContents(this.url, this.queryParams)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.dataSource = new MatTableDataSource(data.content)
          this.paginatorParams.totalPages = data.totalPages
          this.paginatorParams.totalElements = data.totalElements
          console.log(data)
        }
      )
  }

}
