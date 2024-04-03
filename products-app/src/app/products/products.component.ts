import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from 'model/product.model';
import { FormsModule } from '@angular/forms';
import { ProductData } from 'model/productData.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public keyword: string = '';
  totalProducts: number = 0;
  totalPages: number = 0;
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(private ps: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.ps.getAllProducts().subscribe({
      next: (products) => {
        this.totalProducts = products.length;
        this.getProducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getProducts() {
    this.ps.getProducts(this.keyword).subscribe({
      next: (resp) => {
        this.products = resp.body.filter((p: any) =>
          p.name.includes(this.keyword)
        );
        this.totalPages = Math.floor(this.products.length / this.pageSize);

        this.products = this.products.slice(
          this.currentPage * this.pageSize - this.pageSize,
          this.currentPage * this.pageSize
        );
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

  handleGotoPage(page: number) {
    this.currentPage = page;
    this.getProducts();
  }

  handleEditProduct(product: Product) {}
}
