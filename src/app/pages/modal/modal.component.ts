import {Component, Inject, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
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
  public env = environment;

  constructor(private service: HttpService,
              @Inject(MAT_DIALOG_DATA) public data: DataModal,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getUrl();
    this.getData();
    console.log(this.isEdit)
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
            console.log(this.dataSource)
          }
        }
      );
  }

  openModal(slug: string, type: number): void {
    if (!this.isEdit) {
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
    if (!this.isEdit) {
      console.log("edit");
    } else {
      console.log("save");
      console.log(this.dataSource)
    }
  }

  untie() {
    console.log("отвязали")
  }
}
