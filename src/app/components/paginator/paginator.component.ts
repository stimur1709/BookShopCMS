import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {QueryParamDirective} from "../query-param.directive";
import {PaginatorParams} from "../../model/QueryParams";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent extends QueryParamDirective implements AfterViewInit {


  @Input()
  paginatorParams: PaginatorParams = {
    totalPages: 0,
    totalElements: 0
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.translateService.stream("PAGINATOR.FIRST_PAGE")
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.paginator._intl.firstPageLabel = data
        }
      );
    this.translateService.stream("PAGINATOR.ITEMS_PAGE")
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.paginator._intl.itemsPerPageLabel = data
        }
      );
    this.translateService.stream("PAGINATOR.LAST_PAGE")
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.paginator._intl.lastPageLabel = data
        }
      );
    this.translateService.stream("PAGINATOR.NEXT_PAGE")
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.paginator._intl.nextPageLabel = data
        }
      );
    this.translateService.stream("PAGINATOR.PREVIOUS_PAGE")
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.paginator._intl.previousPageLabel = data
        }
      );
  }

  constructor(public translateService: TranslateService) {
    super();
  }

  pageChanged(event: PageEvent): void {
    this.queryParams.offset = event.pageIndex
    this.queryParams.limit = event.pageSize
    this.change()
  }

}
