import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app.header.html',
  styleUrls: [ './app.header.css' ]
})
export class HeaderComponent implements OnInit {
  currentURL : string[]
  homeSelected = "active"
  regiesterSelected = "inactive"
  
  constructor() {}
  
  ngOnInit() {
      this.currentURL = window.location.href.split('/'); 
      this.getActive(this.currentURL[this.currentURL.length-1]);
  }
  
  getActive(module){
      if(module == 'regiester'){
        this.regiesterSelected = "active"
        this.homeSelected = "inactive"
      }
      else{
        this.homeSelected = "active"
        this.regiesterSelected = "inactive"
      }
   }

}
