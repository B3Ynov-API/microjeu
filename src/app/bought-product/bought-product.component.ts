import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-bought-product',
  templateUrl: './bought-product.component.html',
  styleUrls: ['./bought-product.component.css']
})
export class BoughtProductComponent {
  constructor(private prod : ProductService) {
  }

  products: any[] = [];
  modalOpen = false;

  ngOnInit(): void {
    this.prod.getBroughtProducts().then((products) => {
      this.products = products;
    });
  }

  refresh=(): void =>{
    this.prod.getBroughtProducts().then((products) => {
      this.products = products;
    });
  }
}
