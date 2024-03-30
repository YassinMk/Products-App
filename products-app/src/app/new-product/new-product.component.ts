import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Product } from 'model/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  public productForm!: FormGroup;
  constructor(private fb: FormBuilder, private ps: ProductsService) {}
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      price: this.fb.control(0),
      checked: this.fb.control(false),
    });
  }
  saveProduct() {
    let product: Product = this.productForm.value;
    this.ps.saveProduct(product).subscribe({
      next: (data) => {
        alert(JSON.stringify(data));
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
