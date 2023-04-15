import {Component, Input, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {QueryParamDirective} from "../query-param.directive";
import {PaginatorParams, QueryParams} from "../../model/QueryParams";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent extends QueryParamDirective<QueryParams> implements OnInit {

  @Input()
  paginatorParams: PaginatorParams = {
    totalPages: 0,
    totalElements: 0
  };

  ngOnInit(): void {
  }

  pageChanged(event: PageEvent): void {
    this.queryParams.offset = event.pageIndex
    this.queryParams.limit = event.pageSize
    this.change()
  }

}
