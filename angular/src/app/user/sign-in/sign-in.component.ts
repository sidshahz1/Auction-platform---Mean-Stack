import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public userservice: UserService, private router:Router) { }

  model={
    email:"",
    password:""
  };
  servererrormessages: string;

  onSubmit(form: NgForm){
    this.userservice.login(form.value).subscribe(res=>{
      this.userservice.setToken(res['token']);
      this.router.navigateByUrl('/home');
    },
    err=>{
      this.servererrormessages=err.error.message;
    })
  }

  ngOnInit(): void {
    if(this.userservice.isloggedin()){
      this.router.navigateByUrl('/userprofile')
    }
  }

}
