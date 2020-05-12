import { Injectable } from '@angular/core';
import {User,UserRes,Product} from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url1="user";
  url2="product";
  url3="bid";
  url4="help";

  selecteduser: User={
    fullname:'',
    email:'',
    password:''
  };

  constructor(private http: HttpClient) { }

  noAuthHeader= {headers: new HttpHeaders({'NoAuth': 'Ture'})}

  postUser(user: User){
    return this.http.post(this.url1+"/signup",user,this.noAuthHeader);
  }

  verifyPhoneNo(phoneNo,userId){
    return this.http.post(this.url1+'/verifyPhone',{phoneNo:phoneNo,userId:userId},this.noAuthHeader);
  }

  verifyOTP(otp,userId){
    return this.http.post(this.url1+'/verifyOTP',{otp:otp,userId:userId},this.noAuthHeader);
  }

  login(authcredencial){
    return this.http.post(this.url1+"/authenticate",authcredencial,this.noAuthHeader);
  }

  getuserprofile(){
    return this.http.get(this.url1+'/userprofile');
  }

  setToken(token: string){
    localStorage.setItem('token',token);
  }

  deletetoken(){
    localStorage.removeItem('token');
  }

  getuserpayload(){
    var token=localStorage.getItem('token');
    if(token){
      var userpayload=atob(token.split('.')[1]);
      return JSON.parse(userpayload);
    }
    else{
      return null;
    }
  }

  isloggedin(){
    var userpayload=this.getuserpayload();
    if(userpayload){
      return userpayload.exp>Date.now()/1000;
    }
    else{
      return false
    }
  }

  getcetegories(){
    return this.http.get(this.url2+"/getcategories");
  }

  addproduct(product: Product){
    return this.http.post(this.url2+"/addproduct",product);
  }

  getproduct(cid:number){
    return this.http.post(this.url2+'/getproduct',{cid:cid});
  }

  uploadimage(file:File,pid:string){
    console.log(pid);
    const fd=new FormData();
    fd.append('file',file,file.name);
    fd.append('pid',pid);
    return this.http.post(this.url2+'/uploadimage',fd);
  }

  getimage(filename): Observable<Blob>{
    return this.http.get(this.url2+"/getimage/"+filename,{ responseType: 'blob' });
  }

  placeBid(pid:string){
    return this.http.post(this.url3+'/placebid',{pid:pid});
  }

  getItemList(){
    console.log("sending request for seller list.");
    return this.http.get(this.url4+'/itemList');
  }

  generateTicket(ticket){
    console.log("sending request to generate ticket..");
    return this.http.post(this.url4+'/generateTicket',ticket);
  }

  getTicketList(){
    return this,this.http.get(this.url4+"/ticketList");
  }

  getTicketInfo(ticketId){
    return this.http.post(this.url4+'/ticketInfo',{ticketId:ticketId});
  }
}
