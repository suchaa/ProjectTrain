import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  title:string = "this is a title.";
  show:boolean = false;
  list = ["one", "two", "three"]; /* *ngFor */
  isActive:boolean = true; /* ngClass */
  /* ngSwitch */
  conditionExpression = "A";
  case1Exp = "B";
  price:number = 12345678;
  currentDate = new Date();

  ngOnInit() {
  }

  onclick(){
    this.title="click...";
    this.show = !this.show;
    this.isActive = !this.isActive;
  }

}
