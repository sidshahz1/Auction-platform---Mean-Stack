import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Product } from '../shared/user.model';
import {DomSanitizer} from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UploadImageDialogComponent } from './upload-image-dialog/upload-image-dialog.component';

export interface DialogData{
  pid: string
}

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  catergoriesdata;

  newproduct:Product={name:"",cid:null,description:"",price:null};
  successmessage;
  errormessage;
  productid;

  constructor(private userservice: UserService, public _DomSanitizationService: DomSanitizer, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userservice.getcetegories().subscribe(res=>{
      this.catergoriesdata=res;
    })
  }

  addproduct(name,category,details,price){
    this.newproduct.name=name;
    this.newproduct.cid=category;
    this.newproduct.description=details;
    this.newproduct.price=parseFloat(price);
    this.userservice.addproduct(this.newproduct).subscribe(
      res=>{
        this.productid=res['pid'];
        this.opendialoge();
      },
      err=>{
        this.errormessage=err.error.message;
        setTimeout(()=>this.errormessage=false,4000);
      }
    )
  }

  opendialoge(){
    const dialogRef = this.dialog.open(UploadImageDialogComponent, {
      width: '350px',
      height: '400px',
      data: {pid: this.productid}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result==0){
        this.errormessage="image upload failed";
        setTimeout(()=>this.errormessage=false,4000);
      }
      else{
        this.successmessage="product added successfully";
        setTimeout(()=>this.successmessage=false,4000);
      }
    });
  }

  selectedfile:File=null;
  onFileSelected(event){
    console.log(event);
    this.selectedfile=<File>event.target.files[0];
  }

  onUpload(){
    console.log(this.productid);
    this.userservice.uploadimage(this.selectedfile,this.productid).subscribe(res=>{
      console.log(res);
    });
  }

  image;

  createimagefromblob(img:Blob){
    let reader=new FileReader();
    reader.addEventListener("load", () => {
      this.image = reader.result;
   }, false);
   if (img) {
    reader.readAsDataURL(img);
 }
  };

  display(){
    this.userservice.getimage('6b45283960df3883a611953488aaf590.jpg').subscribe(res=>{
      console.log("res function");
      this.createimagefromblob(res);
    },
    error=>{
      console.log("error function");
      console.log("error");
    }
    )
  }

}
