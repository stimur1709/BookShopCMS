import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {HttpService} from "../../services/http.service";
import {take} from "rxjs";
import {QueryParams} from "../../model/QueryParams";

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})
export class ListContentComponent implements OnInit {

  @Input() dataSource!: any
  @Input() isEdit: boolean;
  @Input() type!: number
  @Input() queryModal!: number
  formControl = new FormControl('');
  title: string;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  dataSourceAll!: any

  @ViewChild('input') inputElement: ElementRef<HTMLInputElement>;

  queryParams: QueryParams = {
    offset: 0,
    limit: 5,
    reverse: true,
    property: 'id',
    search: null,
    ids: null
  }

  ngOnInit(): void {
    this.title = this.getTitle()
    this.queryParams.ids = this.dataSource.map((v: { id: any; }) => v.id)
    this.getData()
    console.log(this.queryParams)
  }

  constructor(private service: HttpService) {
  }

  add(): void {
    this.queryParams.search = this.inputElement.nativeElement.value
    this.getData()
  }

  remove(fruit: string): void {
    const index = this.dataSource.indexOf(fruit);

    if (index >= 0) {
      this.dataSource.splice(index, 1);
    }
    this.title = this.getTitle()
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.dataSource.push(event.option.value)
    this.inputElement.nativeElement.value = ''
    this.formControl.setValue(null)
    this.getData()
    this.title = this.getTitle()

  }

  getData() {
    this.queryParams.ids = this.dataSource.map((v: { id: any; }) => v.id)
    this.service.getContents(this.service.getUrl(this.type), this.queryParams)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.dataSourceAll = data.content
        }
      );
  }

  private getTitle(): string {
    switch (this.type) {
      case 1:
        return this.dataSource.length == 1 ? 'CONTENT.BOOK' : 'CONTENT.BOOKS'
      case 2:
        return this.dataSource.length == 1 ? 'CONTENT.AUTHOR' : 'CONTENT.AUTHORS'
      case 3:
        return this.dataSource.length == 1 ? 'CONTENT.GENRE' : 'CONTENT.GENRES'
      default:
        return this.dataSource.length == 1 ? 'CONTENT.TAG' : 'CONTENT.TAGS'
    }
  }

}
