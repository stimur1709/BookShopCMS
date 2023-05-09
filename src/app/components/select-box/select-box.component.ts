import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

class SelectBox {
  value: string;
  view: string;
}

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})
export class SelectBoxComponent {

  selectBox: SelectBox[] = [
    {value: 'day', view: 'OTHER.DAY'},
    {value: 'week', view: 'OTHER.WEEK'},
    {value: 'month', view: 'OTHER.MONTH'},
    {value: 'year', view: 'OTHER.YEAR'},
  ];

  @Output() selectChange = new EventEmitter<string>

  formSelect = new FormControl('day');

  update() {
    let value = this.formSelect.value;
    if (value != null) {
      this.selectChange.emit(value)
    }
  }
}
