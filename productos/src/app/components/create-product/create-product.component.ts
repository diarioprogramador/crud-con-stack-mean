import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  title = 'Creat Product';
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router, private _productService: ProductService, private aRouter: ActivatedRoute) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.Edit();
  }

  addProduct() {

    const PRODUCT: Product = {
      name: this.productForm.get('name')?.value,
      category: this.productForm.get('category')?.value,
      price: this.productForm.get('price')?.value,
      status: this.productForm.get('status')?.value,
    }
    //Verificar existe el producto
    if (this.id !== null) {
      //existe el producto se edita
      this._productService.editProduct(this.id, PRODUCT).subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productForm.reset();
      })
    } else {
      //no existe el producto se crea
      console.log(PRODUCT);
      this._productService.saveProduct(PRODUCT).subscribe(data => {
        this.router.navigate(['/'])
      }, error => {
        console.log(error);
        this.productForm.reset();
      })
    }


  }

  Edit() {

    if (this.id !== null) {
      this.title = 'Edit Product';
      this._productService.getAProduct(this.id).subscribe(data => {
        this.productForm.setValue({
          name: data.name,
          category: data.category,
          price: data.price,
          status: data.status
        })
      })
    }
  }
}
