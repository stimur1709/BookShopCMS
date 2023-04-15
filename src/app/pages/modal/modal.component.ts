import {Component, Inject, OnInit} from '@angular/core';
import {take} from "rxjs";
import {HttpService} from "../../services/http.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DataModal} from "../../model/QueryParams";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  isEdit = false;
  url!: number;
  dataSource!: any;

  constructor(private service: HttpService,
              @Inject(MAT_DIALOG_DATA) public data: DataModal) {
  }

  ngOnInit(): void {
    this.getData()
  }

  private getData() {
    return this.service.getData(this.data.slug, this.data.type)
      .pipe(take(1))
      .subscribe(
        {
          next: (data: any) => {
            this.dataSource = data
          }
        }
      );
  }

  edit() {
    this.isEdit = !this.isEdit
    if (this.isEdit) {
    } else {
      this.service.saveContent(this.data.type, this.dataSource)
        .pipe(take(1))
        .subscribe(
          {
            next: (data: any) => {
              this.dataSource = data
            }
          }
        );
    }
  }

  saveImage(formData: FormData) {
    this.service.saveImage(formData)
      .pipe(take(1))
      .subscribe(
        {
          next: (image: any) => {
            if (this.data.type == 1) {
              this.dataSource.image = image[0].name
              this.dataSource.imageId = image[0].id
            } else {
              this.dataSource.image.id = image[0].id
              this.dataSource.image.name = image[0].name
            }
          }
        }
      )
  }

}
