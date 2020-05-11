import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { DialogData } from '../sell.component';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.css']
})
export class UploadImageDialogComponent implements OnInit {

  constructor(public userservice: UserService,public dialogRef: MatDialogRef<UploadImageDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(0);
  }

  selectedfile:File=null;
  onFileSelected(event){
    console.log(event);
    this.selectedfile=<File>event.target.files[0];
  }

  imageerror=false;
  onUpload(){
    if(this.selectedfile){
      this.userservice.uploadimage(this.selectedfile,this.data.pid).subscribe(res=>{
        console.log(res);
        this.dialogRef.close(1);
      });
    }
    else{
      this.imageerror=true;
    }
  }

}
