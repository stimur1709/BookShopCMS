import {Component} from '@angular/core';
import {TableDirective} from "../table.directive";

@Component({
  selector: 'app-table-author',
  templateUrl: './table-author.component.html',
  styleUrls: ['./table-author.component.css']
})
export class TableAuthorComponent extends TableDirective {

  override displayedColumns: string[] = ['name', 'description'];

}
