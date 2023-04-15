import {Component} from '@angular/core';
import {TableDirective} from "../table.directive";
import {BookQueryParams} from "../../model/QueryParams";

@Component({
  selector: 'app-table-book',
  templateUrl: './table-book.component.html',
  styleUrls: ['./table-book.component.css']
})
export class TableBookComponent extends TableDirective<BookQueryParams> {

  override displayedColumns: string[] = ['title', 'price', 'pubDate', 'popularity', 'rate'];

}
