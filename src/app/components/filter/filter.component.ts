import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [DatePipe]
})
export class FilterComponent {

  @Input() filter: boolean
  @Output() filterChange = new EventEmitter<boolean>()
  @Input() queryParams: any
  @Input() type: number
  @Output() queryParamsChange = new EventEmitter<any>()
  @ViewChild('inputElement', {read: ElementRef}) inputElement: ElementRef
  @ViewChild('picker', {read: ElementRef}) date: ElementRef

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  })

  constructor(protected datePipe: DatePipe) {
  }

  showFilter(): void {
    this.filter = !this.filter;
    if (this.filter) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus()
      }, 100);
    }
    this.filterChange.emit(this.filter)
    this.queryParamsChange.emit(this.queryParams)

  }

  applyInput(): void {
    this.queryParams.search = this.inputElement.nativeElement.value
    this.queryParams.offset = 0
    if (this.type == 2) {
      this.queryParams.from = this.datePipe.transform(this.range.value.start, 'dd.MM.yyyy')
      this.queryParams.to = this.datePipe.transform(this.range.value.end, 'dd.MM.yyyy')
    }
    this.queryParamsChange.emit(this.queryParams)
  }

  clearInput(): void {
    this.inputElement.nativeElement.value = ''
    this.queryParams.search = this.inputElement.nativeElement.value
    this.queryParams.offset = 0
    this.queryParamsChange.emit(this.queryParams)
  }

  applyFilter(): void {
    this.queryParamsChange.emit(this.queryParams)
  }

}
