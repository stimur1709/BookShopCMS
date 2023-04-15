import {Component} from '@angular/core';
import {BookQueryParams} from "../../model/QueryParams";
import {ContentPageDirective} from "../content-page.directive";

@Component({
  selector: 'app-book-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css'],
})
export class BooksPageComponent extends ContentPageDirective {

  override displayedColumns: string[] = ['title', 'price', 'pubDate', 'popularity', 'rate'];
  override url: string = 'api/books';

  public override queryParams: BookQueryParams = {
    offset: 0,
    limit: 10,
    reverse: true,
    property: null,
    search: null,
    bestseller: false,
    discount: false,
    from: null,
    to: null
  }

}
