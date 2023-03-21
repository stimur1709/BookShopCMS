import {Component} from '@angular/core';
import {ContentDirective} from "../content.directive";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent extends ContentDirective {

  override url: string = 'api/authors';
  override displayedColumns: string[] = ['name', 'description'];

}
