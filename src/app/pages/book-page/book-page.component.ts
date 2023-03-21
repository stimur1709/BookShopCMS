import {Component} from '@angular/core';
import {BookQueryParams} from "../../model/QueryParams";
import {ContentDirective} from "../content.directive";


@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent extends ContentDirective {

  override displayedColumns: string[] = ['title', 'price', 'pubDate', 'popularity', 'rate', 'attribute'];
  override url: string = 'api/books';

  public override queryParams: BookQueryParams = {
    offset: 0,
    limit: 10,
    reverse: true,
    property: '',
    search: '',
    bestseller: false,
    discount: false
  }

}
