import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private http :HttpClient){
  }

  ngOnInit(): void {
    this.http.get<Array<any>>("http://localhost:8089/products").subscribe({
      next :data=>{this.products = data},
      error :err=>{console.error(err)}
  })
  }


  products : Array<any> = [];

  handleCheckProduct(product: any){
    this.http.patch(`http://localhost:8089/products/${product.id}`,{checked :!product.checked})
    .subscribe({
      next : updatedProduct =>{
        product.checked = !product.checked;
      }
    })

  }
}
