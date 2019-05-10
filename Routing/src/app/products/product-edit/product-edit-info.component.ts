import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Product } from '../product';

@Component({
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm) productForm: NgForm;

  errorMessage: string;
  product: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // notar el uso de parent para recurar los datos de la plantilla del papá
    // esto lo puede hacer porque esty usando un resolver para precargar la informacion de producto
    this.route.parent.data.subscribe(data => {
      if (this.productForm) {
        this.productForm.reset();
      }
      this.product = data['resolvedData'].product;
    });
  }

}
