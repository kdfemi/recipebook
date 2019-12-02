import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "",
      authDomain: "ng-recipe-book-31179.firebaseapp.com",
    });
    if(localStorage.getItem('xsdyghl234')==null){
      localStorage.setItem('xsdyghl234','')
    }else {console.log('location is not null') }
  }
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
