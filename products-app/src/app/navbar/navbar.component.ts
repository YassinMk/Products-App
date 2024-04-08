import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  actions: Array<any> = [
    { title: 'Home', route: 'home', icon: 'house' },
    { title: 'Products', route: '/admin/products', icon: 'search' },
    { title: 'New Product', route: '/admin/newProduct', icon: 'bag-plus' },
  ];
  //public isLoading : boolean = false;
  currentActions: any;

  constructor(public appState: AppStateService, public ls: LoadingService, private router:Router) {}
  setCurrentAction(action: any) {
    this.currentActions = action;
  }
  Login() {
    this.router.navigateByUrl("/login");
  }
  logout() {
    this.appState.authState={};
    this.router.navigateByUrl("/login");
  }
}
