import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-app-error',
  templateUrl: './app-error.component.html',
  styleUrls: ['./app-error.component.css']
})
export class AppErrorComponent {
showError : boolean = false;
  constructor(public appState: AppStateService){
   
  }
  
}
