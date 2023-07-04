import {Component} from '@angular/core';
import {TableDirective} from "../table.directive";

@Component({
  selector: 'app-review-table',
  templateUrl: './review-table.component.html',
  styleUrls: ['./review-table.component.css']
})
export class ReviewTableComponent extends TableDirective {

  override displayedColumns: string[] = ['time', 'text', 'actions'];

  override save(data: any) {
    data.status = 1;
    super.save(data);
  }

}
