import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product, ProductService } from '../../services/product-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  isEdit = false;
  productId!: number;
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize the form here
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
    });

    // Check if editing
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.productId = +params['id'];
        const product = this.productService.getProductById(this.productId);
        if (product) {
          this.productForm.patchValue(product);
        }
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const formValue = this.productForm.value;

    if (this.isEdit) {
      const updatedProduct: Product = {
        id: this.productId,
        name: formValue.name ?? '',
        description: formValue.description ?? '',
        price: formValue.price ?? 0,
      };
      this.productService.updateProduct(updatedProduct);
    } else {
      const newProduct: Product = {
        id: new Date().getTime(),
        name: formValue.name ?? '',
        description: formValue.description ?? '',
        price: formValue.price ?? 0,
      };
      this.productService.addProduct(newProduct);
    }
    this.router.navigate(['/products']);
  }
}
