import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-store',
  templateUrl: './main-store.component.html',
  styleUrls: ['./main-store.component.css']
})
export class MainStoreComponent {  

  products: any[] = [];
  modalOpen = false;

  constructor(private prod : ProductService) { }

  ngOnInit(): void {
    this.prod.getShopProducts().then((products) => {
      this.products = products;
      console.log(products);
    });
  }
  truc=(): void =>{
    this.prod.getShopProducts().then((products) => {
      this.products = products;
      console.log(products);
    });
  }
}
