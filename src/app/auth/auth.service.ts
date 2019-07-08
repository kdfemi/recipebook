import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router){}
  token:string
  tokenChanged = new Subject<string>();
 signupUser(email:string, password:string){
   firebase.auth().createUserWithEmailAndPassword(email,password).catch(
     error => console.log(error)
   )
 }

 signinUser(email:string, password:string){
   firebase.auth().signInWithEmailAndPassword(email,password).then(
    (res)=> {
      this.router.navigate(['/'])
      this.token = this.getToken();
      this.tokenChanged.subscribe((tk:string)=>{
        localStorage.setItem('xsdyghl234',tk);
      })
    }
   ).catch(
    (err)=> {
      console.log(err)
    }
   )
 }

 getToken(){
    firebase.auth().currentUser.getIdToken()
  .then(
    (token:string) => {
        this.token = token
        this.tokenChanged.next(token)
      });
    // return this.token;
    return localStorage.getItem('xsdyghl234');
  }

  isAuthenticated(){
    // return this.token !=null;
    return localStorage.getItem('xsdyghl234') !=null;
  }

  logout(){
    firebase.auth().signOut();
    localStorage.removeItem('xsdyghl234')
    this.token = null;
  }
}
