import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Photos } from '../../model/photo.model';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent  {
  itemDelete: any;
  constructor(
    public dialogRef: MatDialogRef<DeleteItemComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Photos) {
    console.log(data);
    this.itemDelete = {...data};
  }

  doAction(){
    this.dialogRef.close({event: 'delete', data: this.itemDelete});
  }

  closeDialog(){
    this.dialogRef.close({event: 'cancel'});
  }

}
