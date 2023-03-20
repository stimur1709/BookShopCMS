import {Component} from '@angular/core';
import {ContentComponent} from "../content/content.component";
import {QueryParams} from "../../model/QueryParams";
import {HttpService} from "../../services/http.service";
import {AuthorPage} from "../../model/DataPage";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent extends ContentComponent<AuthorPage> {

  constructor(service: HttpService) {
    super(service);
  }

  override url: string = 'api/authors';
  override displayedColumns: string[] = ['name', 'description'];

  public override queryParams: QueryParams = {
    offset: 0,
    limit: 10,
    reverse: true,
    property: 'name',
    search: '',
  }

}
