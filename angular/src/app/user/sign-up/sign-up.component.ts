import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { UserRes } from '../../shared/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  successMessage: boolean;
  errorMessage;
  currentUser;
  otpTab;
  constructor(public userservice: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.userservice.postUser(form.value).subscribe(
      res=>{
        this.currentUser=res['_id'];
        this.successMessage=true;
        // setTimeout(()=>this.successMessage=false,4000);
      },
      err=>{}
    );
  }

  verifyPhoneNo(phoneNo){
    this.userservice.verifyPhoneNo(phoneNo,this.currentUser).subscribe(res=>{
      console.log(res);
      this.otpTab=true;
      this.successMessage=false;
    },err=>{
      console.log(err.error.message);
      this.errorMessage=true;
      this.successMessage=false;
    })
  }

  verifyOTP(otp){
    this.userservice.verifyOTP(otp,this.currentUser).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }
}
