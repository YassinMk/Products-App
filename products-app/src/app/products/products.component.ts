import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from 'model/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public keyword: string = '';
  constructor(private ps: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.ps.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleCheckProduct(product: Product) {
    this.ps.checkProduct(product).subscribe({
      next: (updateProduct) => {
        product.checked = !product.checked;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  handleDeleteProduct(product: Product) {
    if (confirm('Are you sure you want to delete this product?'))
      this.ps.deleteProduct(product).subscribe({
        next: (value) => {
          this.products = this.products.filter((p) => p.id !== product.id);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  searchProduct() {
    this.ps.searchProducts(this.keyword).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
