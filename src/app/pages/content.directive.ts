import {Directive, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Content} from "./Content";
import {Subscription, take} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {HttpService} from "../services/http.service";
import {PaginatorParams, QueryParams} from "../model/QueryParams";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {DataPage} from "../model/DataPage";
import {FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "./modal/modal.component";

@Directive({
  selector: '[appContent]',
  providers: [DatePipe]
})
export class ContentDirective implements Content<QueryParams, DataPage>, OnInit {

  url!: string;
  dataSource: MatTableDataSource<DataPage>;
  displayedColumns!: string[];
  filter: boolean = false;

  paginatorParams: PaginatorParams = {
    totalPages: 0,
    totalElements: 0
  };

  queryParams: QueryParams = {
    offset: 0,
    limit: 10,
    reverse: true,
    property: null,
    search: null
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @ViewChild('inputElement', {read: ElementRef})
  inputElement: ElementRef

  @ViewChild('picker', {read: ElementRef})
  date: ElementRef


  constructor(private service: HttpService,
              protected datePipe: DatePipe,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): Subscription {
    return this.service.getAll(this.queryParams, this.url)
      .pipe(take(1))
      .subscribe(
        {
          next: (data: any) => {
            console.log(data)
            this.dataSource = new MatTableDataSource(data.content);
            this.paginatorParams.totalPages = data.totalPages;
            this.paginatorParams.totalElements = data.totalElements;
          }
        }
      );
  }

  applyFilter(): void {
    console.log(this.queryParams);
    this.getData();
  }

  applyInput(): void {
    this.queryParams.search = this.inputElement.nativeElement.value;
    this.queryParams.offset = 0;
    this.getData();
  }

  clearInput(): void {
    this.inputElement.nativeElement.value = '';
    this.queryParams.search = this.inputElement.nativeElement.value;
    this.queryParams.offset = 0;
    this.getData();
  }

  pageChanged(event: PageEvent): void {
    this.queryParams.offset = event.pageIndex;
    this.queryParams.limit = event.pageSize;
    this.getData();
  }

  sortChanged(event: Sort): void {
    this.queryParams.property = event.active;
    this.queryParams.reverse = event.direction == 'asc';
    this.getData();
  }


  showFilter(): void {
    this.filter = !this.filter;
    if (this.filter) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus()
      }, 100);
    }
  }

  openModal(slug: string, type: number): void {
    this.dialog.open(ModalComponent, {
      data: {
        type: type,
        slug: slug
      }
    })
  }

}
