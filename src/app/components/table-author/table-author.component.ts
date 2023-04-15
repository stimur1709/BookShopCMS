import {Component} from '@angular/core';
import {TableDirective} from "../table.directive";
import {QueryParams} from "../../model/QueryParams";

@Component({
  selector: 'app-table-author',
  templateUrl: './table-author.component.html',
  styleUrls: ['./table-author.component.css']
})
export class TableAuthorComponent extends TableDirective<QueryParams> {

  override displayedColumns: string[] = ['name', 'description'];

}
