import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { StripeToken, StripeSource } from 'stripe-angular';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userdetails;
  invalidError;
  extraData = {
    "name": "sid",
    "address_city": ".",
    "address_line1": "c",
    "address_line2": "s",
    "address_state": "a",
    "address_zip": "a"
  }

  onStripeInvalid( error:Error ){
    console.log('Validation Error', error)
  }
 
  setStripeToken( token:StripeToken ){
    console.log('Stripe token', token)
  }
 
  setStripeSource( source:StripeSource ){
    console.log('Stripe source', source)
  }
 
  onStripeError( error:Error ){
    console.error('Stripe error', error)
  }

  constructor(public userservice: UserService, private router:Router) { }

  ngOnInit(): void {
    this.userservice.getuserprofile().subscribe(
      res=>{
        this.userdetails=res['user'];
      }
    )
  }
  onlogout(){
    this.userservice.deletetoken();
    this.router.navigateByUrl('/login');
  }

}
