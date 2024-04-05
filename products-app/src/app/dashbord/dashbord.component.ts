import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {

  constructor(public appState: AppStateService) {}
  checkedProducts() {
    let checkedProducts= this.appState.productsState.products.filter((p:any)=> p.checked);
    return checkedProducts.length;
  }
}
