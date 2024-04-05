import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from 'model/product.model';
import { FormsModule } from '@angular/forms';
import { ProductData } from 'model/productData.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private ps: ProductsService,
    private router: Router,
    public appState: AppStateService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    //this.appState.setProductsState({ status: 'LOADING' });
    this.ps.getAllProducts().subscribe({
      next: (products) => {
        let totalProducts = products.length;
        this.appState.setProductsState({ totalProducts: totalProducts });
        this.getProducts();
        this.appState.setProductsState({
          status: 'LOADED',
        });
      },
      error: (error) => {
        console.log(error);
        this.appState.setProductsState({
          status: 'ERROR',
          errorMessage: error,
        });
      },
    });
  }

  getProducts() {
    //this.appState.setProductsState({ status: 'LOADING' });
    this.ps.getProducts(this.appState.productsState.keyword).subscribe({
      next: (resp) => {
        let products = resp.body.filter((p: any) =>
          p.name.includes(this.appState.productsState.keyword)
        );
        let totalPages = Math.floor(
          products.length / this.appState.productsState.pageSize
        );

        let start =
          (this.appState.productsState.currentPage - 1) *
          this.appState.productsState.pageSize;
        let end =
          this.appState.productsState.currentPage *
          this.appState.productsState.pageSize;

        products = products.slice(start, end);
        this.appState.setProductsState({
          products: products,
          totalPages: totalPages,

        })
        // Update the productsState using setProductsState
        
      },
      error: (error) => {
        console.log(error);
        this.appState.setProductsState({
          status: 'ERROR',
          errorMessage: error,
        });
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
          this.getAllProducts();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  handleGotoPage(page: number) {
    this.appState.productsState.currentPage = page;
    this.getProducts();
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
