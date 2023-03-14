import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../../services/book.service";
import {BooksPage} from "../../model/BooksPage";
import {Book} from "../../model/Book";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {QueryParams} from "../../model/QueryParams";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent implements OnInit, AfterViewInit  {

  public queryParams: QueryParams = {
    offset: 0,
    limit: 10,
    reverse: true,
    sort: 'title',
    totalPages: 0,
    count: 0
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: MatTableDataSource<Book>;

  constructor(private bookService: BookService) {
  }

  displayedColumns: string[] = ['title', 'image', 'discount', 'isBestseller', 'popularity', 'price', 'pubDate', 'rate'];

  ngOnInit(): void {
    this.getBooks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public pageChanged(event: PageEvent) {
    this.queryParams.offset = event.pageIndex;
    this.queryParams.limit = event.pageSize;
    this.getBooks();
  }

  private getBooks() {
    this.bookService.getAll(this.queryParams).subscribe(
      {next: (data: BooksPage) => {
          this.dataSource = new MatTableDataSource(data.books);
          this.queryParams.totalPages = data.totalPages
          this.queryParams.count = data.count
          this.queryParams.sort = data.sort
          console.log(this.dataSource);
          console.log(this.queryParams);
        }});
  }
}
