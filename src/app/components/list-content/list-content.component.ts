import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  @Output() dataSourceChange = new EventEmitter<any>()
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
    property: null,
    search: null,
    ids: null
  }

  ngOnInit(): void {
    this.title = this.getTitle()
    this.queryParams.ids = this.dataSource.map((v: { id: any; }) => v.id)
    this.getData()
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
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.dataSource.push(event.option.value);
    this.inputElement.nativeElement.value = '';
    this.formControl.setValue(null);
  }

  private getData() {
    this.queryParams.ids = this.dataSource.map((v: { id: any; }) => v.id)
    this.service.getAll(this.queryParams, this.type)
      .pipe(take(1))
      .subscribe(
        {
          next: (data: any) => {
            this.dataSourceAll = data.content
          }
        }
      );
  }

  openModal(slug: string, type: number): void {
    if (!this.isEdit) {
      // this.dialogRef.close();
      // this.dialog.open(BookModalComponent, {
      //   data: {
      //     type: type,
      //     slug: slug
      //   }
      // });
    }
  }

  deleteLink(list: any, item: any) {
    list.splice(list.indexOf(item), 1)
    this.dataSourceChange.emit(this.dataSource)
  }


  private getTitle(): string {
    switch (this.type) {
      case 1:
        return this.dataSource.length == 0 ? 'Книга' : 'Книги'
      case 2:
        return this.dataSource.length == 0 ? 'Автор' : 'Авторы'
      case 3:
        return this.dataSource.length == 0 ? 'Жанр' : 'Жанры'
      default:
        return this.dataSource.length == 0 ? 'Тег' : 'Теги'
    }
  }

}
