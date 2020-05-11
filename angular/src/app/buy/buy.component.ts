import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  categoriesdata;
  selectedcategory;
  selectedproducts;
  currentTimeStamp;

  constructor(private userservice: UserService) { }

  ngOnInit(): void {
    this.currentTimeStamp=Date.now();
    this.userservice.getcetegories().subscribe(res=>{
      this.categoriesdata=res;
      console.log(res);
    })
  }

  getdetails(cid){
    this.selectedcategory=cid;
    this.userservice.getproduct(this.selectedcategory).subscribe(res=>{
      this.selectedproducts=res;
      console.log(this.selectedproducts);
    })
    console.log(this.selectedcategory);
  }

  countdown(time){
    let timeleft=time-this.currentTimeStamp;
    let timeremaining:{days:number,hours:number,minutes:number,seconds:number}={days:null,hours:null,minutes:null,seconds:null};
    timeremaining.days=Math.floor(timeleft/1000/60/60/24);
    timeremaining.hours=Math.floor((timeleft-timeremaining.days*24*60*60*1000)/1000/60/60);
    timeremaining.minutes=Math.floor((timeleft-timeremaining.days*24*60*60*1000-timeremaining.hours*60*60*1000)/1000/60);
    timeremaining.seconds=Math.floor((timeleft-timeremaining.days*24*60*60*1000-timeremaining.hours*60*60*1000-timeremaining.minutes*60*1000)/1000);
    return timeremaining;
  }

  placeBid(pid:string,cid:string){
    this.userservice.placeBid(pid).subscribe(
      res=>{
        this.getdetails(cid);
      },
      err=>{
        console.log(err.error.message);
      }
    )
  }

//   image;
//   createimagefromblob(img:Blob){
//     let reader=new FileReader();
//     reader.addEventListener("load", () => {
//       this.image = reader.result;
//    }, false);
//    if (img) {
//     reader.readAsDataURL(img);
//  }
//   };

//   getimage(pid){
//     console.log(pid);
//     this.userservice.getimage(pid).subscribe(res=>{
//       this.createimagefromblob(res);
//       return this.image;
//     },
//     error=>{
//       console.log("error");
//     }
//     )
//   }

}
