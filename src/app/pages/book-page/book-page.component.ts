import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {BookQueryParams, PaginatorParams} from "../../model/QueryParams";
import {Sort} from "@angular/material/sort";
import {HttpService} from "../../services/http.service";
import {Book} from "../../model/Data";
import {BookPage} from "../../model/DataPage";
import {take} from "rxjs";


@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent implements OnInit {

  input: string = '';
  showFilter = false;

  public queryParams: BookQueryParams = {
    offset: 0,
    limit: 10,
    reverse: true,
    property: 'popularity',
    search: '',
    bestseller: false,
    discount: false
  }

  public paginatorParams: PaginatorParams = {
    totalPages: 0,
    count: 0
  }

  public dataSource: MatTableDataSource<Book>;

  constructor(private service: HttpService) {
  }

  displayedColumns: string[] = ['title', 'price', 'pubDate', 'popularity', 'rate'];

  ngOnInit(): void {
    this.getBooks();
  }

  public pageChanged(event: PageEvent) {
    this.queryParams.offset = event.pageIndex;
    this.queryParams.limit = event.pageSize;
    this.getBooks();
  }

  sortChanged(event: Sort) {
    this.queryParams.property = event.active;
    this.queryParams.reverse = event.direction == 'asc';
    this.getBooks();
  }

  private getBooks() {
    this.service.getAll(this.queryParams, 'api/books')
      .pipe(take(1))
      .subscribe(
        {
          next: (data: BookPage) => {
            console.log(data);
            this.dataSource = new MatTableDataSource(data.content);
            this.paginatorParams.totalPages = data.totalPages;
            this.paginatorParams.count = data.count;
          }
        }
      );
  }

  applyInput(event: Event) {
    this.queryParams.search = (event.target as HTMLInputElement).value;
    this.queryParams.offset = 0;
    this.getBooks();
  }

  clearInput() {
    this.input = '';
    this.queryParams.search = this.input;
    this.queryParams.offset = 0;
    this.getBooks();
  }

  applyFilter() {
  }
}
