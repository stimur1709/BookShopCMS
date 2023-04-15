import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})
export class ListContentComponent implements OnInit {

  @Input()
  dataSource!: any

  @Output()
  dataSourceChange = new EventEmitter<any>()

  @Input()
  isEdit = false;

  @Input()
  type!: number

  title: string;

  ngOnInit(): void {
    this.title = this.getTitle()
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
