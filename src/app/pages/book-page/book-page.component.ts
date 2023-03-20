import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {BookPage} from "../../model/DataPage";
import {Book} from "../../model/Model";
import {PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {BookQueryParams} from "../../model/QueryParams";
import {Sort} from "@angular/material/sort";


@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent implements OnInit {

  input: string = ''

  public queryParams: BookQueryParams = {
    offset: 0,
    limit: 10,
    reverse: true,
    property: 'popularity',
    totalPages: 0,
    count: 0,
    search: '',
    bestseller: false
  }

  public dataSource: MatTableDataSource<Book>;

  constructor(private httpService: HttpService) {
    httpService.url = 'api/books'
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
    this.httpService.getAll(this.queryParams).subscribe(
      {
        next: (data: BookPage) => {
          this.dataSource = new MatTableDataSource(data.content);
          this.queryParams.totalPages = data.totalPages;
          this.queryParams.count = data.count;
        }
      });
  }

  applyFilter(event: Event) {
    this.queryParams.search = (event.target as HTMLInputElement).value;
    this.queryParams.offset = 0;
    this.getBooks();
  }
}
