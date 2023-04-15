import {Component} from '@angular/core';
import {ContentDirective} from "../content.directive";

@Component({
  selector: 'app-author',
  templateUrl: './authors-page.component.html',
  styleUrls: ['./authors-page.component.css']
})
export class AuthorsPageComponent extends ContentDirective {

  override url: string = 'api/authors';
  override displayedColumns: string[] = ['name', 'description'];

}
