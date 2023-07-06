import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {DateParserDirective} from "../date-parser.directive";
import {IntervalDate} from "../../model/QueryParams";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() intervalDate!: IntervalDate
  @Output() intervalDateChange = new EventEmitter<IntervalDate>()

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  })

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.range = new FormGroup({
      start: new FormControl<Date | null>(DateParserDirective.getDate(this.intervalDate.dateS)),
      end: new FormControl<Date | null>(DateParserDirective.getDate(this.intervalDate.dateE)),
    })
  }

  updateDate() {
    let dateS = this.datePipe.transform(this.range.value.start, 'dd.MM.yyyy');
    let dateE = this.datePipe.transform(this.range.value.end, 'dd.MM.yyyy');
    if (dateS != null && dateE != null) {
      this.intervalDate.dateS = dateS
      this.intervalDate.dateE = dateE
      this.intervalDateChange.emit(this.intervalDate)
    }
  }

}
