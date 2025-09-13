import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, FilterPipe, HttpClientModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  searchText: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  editProduct(id: number) {
    this.router.navigate(['/edit-product', id]);
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
    this.loadProducts();
  }
}
