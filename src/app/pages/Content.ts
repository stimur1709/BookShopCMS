import {QueryParams} from "../model/QueryParams";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";

export interface Content {
  getData(queryParams: QueryParams, url: string): Subscription;
  sortChanged(event: Sort): void;
  pageChanged(event: PageEvent): void;
}
