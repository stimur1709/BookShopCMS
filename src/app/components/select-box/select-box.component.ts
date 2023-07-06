import {Component, EventEmitter, Output} from '@angular/core';

class SelectBox {
  value: string | null;
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

  selected = this.selectBox[0];

  update(select: SelectBox) {
    if (select.value != null) {
      this.selectChange.emit(select.value)
    }
  }
}
