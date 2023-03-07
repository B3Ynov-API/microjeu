import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { SecondHandProduct } from '../second-hand-product';

@Component({
  selector: 'app-second-store',
  templateUrl: './second-store.component.html',
  styleUrls: ['./second-store.component.css']
})
export class SecondStoreComponent {

  products: SecondHandProduct[] = [];

  constructor(private productService: ProductService) { }

  //Retrive data when the component is initialized
  async ngOnInit() {
    await this.productService.getSecondHandProducts().then((products) => {
      this.products = <SecondHandProduct[]>products;
      console.log(this.products);
    });
  }
}
