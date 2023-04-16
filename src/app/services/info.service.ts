import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: any) {
    message = this.mapToString(message);
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  private mapToString(message: any): string {
    if (typeof message == 'string' || typeof message == 'number' || message instanceof String) {
      return message.toString()
    } else {
      let messages = ''
      for (let [, value] of Object.entries(message)) {
        console.log(`${value}`)
        messages +=  `${value}`
      }
      return messages
    }
  }

}
