import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/models/product.model';

import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  template: `<app-products [productId]="productId" [products]="products" (loadM)="loadMore()"></app-products>`,
})
export class CategoryComponent implements OnInit{

  categoryId: string | null = null;

  limit = 10;
  offset = 0;
  products: Product[] = [];

  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ){}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        }
        return [];
      }),
      /* Para concatenar más peticiones evitando callback hell */
      /* switchMap(params => {
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        }
        return [];
      }) */
    )
    .subscribe(data => {
      this.products = data;
    })
    // Para vigilar los parámetros URL
    this.route.queryParamMap.subscribe(
      params => {
        this.productId = params.get('product');
        /* console.log(this.productId); */
      }
    )
  }
  loadMore() {
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }



}
