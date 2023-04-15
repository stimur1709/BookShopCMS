import {Component} from '@angular/core';
import {ContentPageDirective} from "../content-page.directive";

@Component({
  selector: 'app-author',
  templateUrl: './authors-page.component.html',
  styleUrls: ['./authors-page.component.css']
})
export class AuthorsPageComponent extends ContentPageDirective {

  override url: string = 'api/authors';
  override displayedColumns: string[] = ['name', 'description'];

}
