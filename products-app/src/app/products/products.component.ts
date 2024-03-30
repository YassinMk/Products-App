import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Array<any> = [
    {name:"product 1",price:100, checked:false},
    {name:"product 2",price:200, checked:false},
    {name:"product 3",price:300, checked:false},
    {name:"product 4",price:400, checked:false},
  ];
  handleCheckProduct(product: any){
    product.checked = !product.checked;
  }
}
