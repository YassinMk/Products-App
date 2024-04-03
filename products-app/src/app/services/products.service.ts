import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

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
  
  public getProducts(keyword :string="")
  {
    return this.http.get<any>(
      `http://localhost:8089/products?name_like=${keyword}`,
      { observe: 'response' }
    );
  }
  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8089/products');
  }
}
