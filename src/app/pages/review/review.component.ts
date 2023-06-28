import {Component} from '@angular/core';
import {ContentPageDirective} from "../content-page.directive";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent extends ContentPageDirective {

  override url: string = "api/review"

}
