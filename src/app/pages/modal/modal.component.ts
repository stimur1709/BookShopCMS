import {Component, Inject, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {take} from "rxjs";
import {environment} from "../../environments/environment";

interface DataModal {
  type: number,
  slug: string
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  url!: string;
  dataSource!: any;
  isEdit = false;
  isFirst = false;
  env = environment;

  constructor(private service: HttpService,
              @Inject(MAT_DIALOG_DATA) public data: DataModal,
              public dialogRef: MatDialogRef<ModalComponent>,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getUrl();
    this.getData();
  }

  getUrl() {
    switch (this.data.type) {
      case 1:
        this.url = 'api/books';
        break;
      case 2:
        this.url = 'api/authors';
        break;
      case 3:
        this.url = 'api/genres';
        break;
      case 4:
        this.url = 'api/tags';
        break;
    }
  }

  getData() {
    return this.service.getData(this.data.slug, this.url)
      .pipe(take(1))
      .subscribe(
        {
          next: (data: any) => {
            this.dataSource = data;
          }
        }
      );
  }

  openModal(slug: string, type: number): void {
    if (!this.isEdit) {
      this.dialogRef.close();
      this.dialog.open(ModalComponent, {
        data: {
          type: type,
          slug: slug
        }
      });
    }
  }

  edit() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
    } else {
      this.service.saveContent(this.url, this.dataSource)
        .pipe(take(1))
        .subscribe(
          {
            next: (data: any) => {
              this.dataSource = data;
            }
          }
        );
    }
  }

  untie() {
  }

  changeImage(event: Event) {
    if (this.isEdit) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        let newPhotoFormData = new FormData()
        newPhotoFormData.append('file', input.files[0])
        this.service.saveImage(newPhotoFormData)
          .pipe(take(1))
          .subscribe(
            {
              next: (data: any) => {
                this.dataSource.image = data[0].name;
                this.dataSource.imageId = data[0].id;
              }
            }
          );
      }
    }
  }

  deleteLink(list: any, item: any) {
    list.splice(list.indexOf(item), 1);
  }

}
