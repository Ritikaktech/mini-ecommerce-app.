import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root', // ✅ Global provider
})
export class ProductService {
  private storageKey = 'products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    const products = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return of(products);
  }

  addProduct(product: Product): void {
    const products = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  getProductById(id: number): Product | undefined {
    const products = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return products.find((p: Product) => p.id === id);
  }

  updateProduct(updatedProduct: Product): void {
    let products = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    products = products.map((p: Product) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  deleteProduct(id: number): void {
    let products = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    products = products.filter((p: Product) => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }
}
