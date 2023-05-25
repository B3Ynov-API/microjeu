import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent {
  constructor(private prod : ProductService, private auth: AuthService) { }

  products: any[] = [];
  //Retrive data when the component is initialized
  async ngOnInit(): Promise<void> {
    await this.prod.getMyProducts(this.auth.getUserId()).then((products) => {
      this.products = products;
    });    
  }

  //rafraichit la page
  refresh=(): void =>{
    this.prod.getShopProducts().then((products) => {
      this.products = products;
      console.log("Refresh");
    });
  }
}
