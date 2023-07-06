import {Component} from '@angular/core';
import {TableDirective} from "../table.directive";

@Component({
  selector: 'app-table-book',
  templateUrl: './table-book.component.html',
  styleUrls: ['./table-book.component.css']
})
export class TableBookComponent extends TableDirective {

  override displayedColumns: string[] = ['title', 'price', 'pubDate', 'popularity', 'rate', 'actions'];

}
