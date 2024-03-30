import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private ps :ProductsService ){
  }

  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts(){
    this.ps.getProducts().subscribe({
      next : products =>{
        this.products = products;
      },
      error : error =>{
        console.log(error);
      }
    })
  }

  products : Array<any> = [];

  handleCheckProduct(product: any){
   this.ps.checkProduct(product).subscribe({
      next :updateProduct =>{
        product.checked = !product.checked;
      },
      error : error =>{
        console.log(error);
      }
    })
  }
}
