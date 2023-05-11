import {Component} from '@angular/core';
import {ContentPageDirective} from "../content-page.directive";
import {TagQueryParams} from "../../model/QueryParams";

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.css']
})
export class GenrePageComponent extends ContentPageDirective {

  override url: string = 'api/genres';

  override queryParams: TagQueryParams = {
    offset: 0,
    limit: 10,
    reverse: true,
    property: null,
    search: null,
    all: true
  }

}
