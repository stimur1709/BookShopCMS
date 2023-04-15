import {Directive, ElementRef, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {environment} from "../environments/environment";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ModalComponent} from "../pages/modal/modal.component";
import {DataModal} from "../model/QueryParams";

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {

  @Input() dataSource!: any
  @Input() data!: any
  @Output() dataSourceChange = new EventEmitter<any>()
  @Input() isEdit = false;
  @Output() isEditChange = new EventEmitter<boolean>()
  @Output() photoChange = new EventEmitter<FormData>()
  @ViewChild('image', {read: ElementRef}) image: ElementRef
  env = environment;

  constructor(@Inject(MAT_DIALOG_DATA) public queryModal: DataModal,
              public dialogRef: MatDialogRef<ModalComponent>,
              public dialog: MatDialog) {
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


}
