import {Component, Inject, OnInit} from '@angular/core';
import {take} from "rxjs";
import {HttpService} from "../../services/http.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DataModal} from "../../model/QueryParams";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InfoService} from "../../services/info.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  isEdit = false;
  dataSource!: any;
  formGroup!: FormGroup

  constructor(private service: HttpService,
              @Inject(MAT_DIALOG_DATA) public data: DataModal,
              private infoService: InfoService) {
  }

  ngOnInit(): void {
    if (this.data.slug == null) {
      this.dataSource = {
        title: null,
        discount: 0,
        image: '1.png',
        imageId: 1,
        isBestseller: 0,
        popularity: 0,
        price: 500,
        slug: null,
        rate: 0,
        tagList: [],
        authorList: [],
        genreList: []
      }
      this.isEdit = true;
      this.formBuild()
    } else {
      this.getData()
    }
  }

  private getData() {
    this.service.getContent(this.service.getUrl(this.data.type), this.data.slug)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.dataSource = data
        }
      );
  }

  edit() {
    this.isEdit = !this.isEdit
    if (this.isEdit) {
      this.formBuild()
    } else {
      this.service.saveContent(this.service.getUrl(this.data.type), this.dataSource)
        .pipe(take(1))
        .subscribe(
          () => {
            this.infoService.openSnackBar("Сохранено")
          }
        );
    }
  }

  cancel() {
    if (this.isEdit) {
      this.isEdit = !this.isEdit
      this.getData()
    }
  }

  saveImage(formData: FormData) {
    this.service.saveImage(formData)
      .pipe(take(1))
      .subscribe(
        (image) => {
          if (this.data.type == 1) {
            this.dataSource.image = image[0].name
            this.dataSource.imageId = image[0].id
          } else {
            this.dataSource.image.id = image[0].id
            this.dataSource.image.name = image[0].name
          }
        }
      )
  }

  private formBuild(): void {
    if (this.data.type == 1) {
      this.formGroup = new FormGroup({
        title: new FormControl(this.dataSource.title, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ]),
        price: new FormControl(this.dataSource.price, [
          Validators.required,
          Validators.minLength(10)
        ]),
        discount: new FormControl(this.dataSource.discount, [
          Validators.required,
          Validators.min(0),
          Validators.max(100)
        ]),
        description: new FormControl(this.dataSource.description)
      })
    } else {
      this.formGroup = new FormGroup({
        name: new FormControl(this.dataSource.name, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ]),
        description: new FormControl(this.dataSource.description)
      })
    }
  }

}
