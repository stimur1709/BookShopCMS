import {Directive, ElementRef, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {environment} from "../environments/environment";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DataModal} from "../model/QueryParams";
import {FormGroup} from "@angular/forms";

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {

  @Input() dataSource!: any
  @Input() data!: any
  @Input() isEdit = false;
  @Input() formModal!: FormGroup
  @Output() photoChange = new EventEmitter<FormData>()
  @ViewChild('image', {read: ElementRef}) image: ElementRef
  @ViewChild('title', {read: ElementRef}) title: ElementRef
  env = environment;

  constructor(@Inject(MAT_DIALOG_DATA) public queryModal: DataModal) {
  }

  openSelectFile() {
    if (this.isEdit) {
      this.image.nativeElement.click()
    }
  }

  changeImage(event: Event) {
    if (this.isEdit) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        let newPhotoFormData = new FormData()
        newPhotoFormData.append('file', input.files[0])
        this.photoChange.emit(newPhotoFormData);
      }
    }
  }

  change() {
    if (this.queryModal.type == 1) {
      this.dataSource.title = this.formModal.value.title
      this.dataSource.price = this.formModal.value.price
      this.dataSource.discount = this.formModal.value.discount
    } else if (this.queryModal.type == 2) {
      this.dataSource.name = this.formModal.value.name
    }
    this.dataSource.description = this.formModal.value.description
  }

}
