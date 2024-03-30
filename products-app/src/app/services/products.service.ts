import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  public getProducts() {
    return this.http.get<Array<Product>>('http://localhost:8089/products');
  }
  public checkProduct(product: Product): Observable<any> {
    return this.http.patch<Product>(
      `http://localhost:8089/products/${product.id}`,
      { checked: !product.checked }
    );
  }
  public deleteProduct(product: Product) {
    return this.http.delete<any>(
      `http://localhost:8089/products/${product.id}`
    );
  }
  public saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8089/products', product);
  }
  public searchProducts(keyword: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `http://localhost:8089/products?name_like=${keyword}`
    );
  }
}
