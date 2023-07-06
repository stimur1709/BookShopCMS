import {Component} from '@angular/core';
import {ModalDirective} from "../modal.directive";

@Component({
  selector: 'app-author-modal',
  templateUrl: './author-modal.component.html',
  styleUrls: ['./author-modal.component.css']
})
export class AuthorModalComponent extends ModalDirective {

}
