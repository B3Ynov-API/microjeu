import { getAuth } from 'firebase/auth';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-second-store',
  templateUrl: './second-store.component.html',
  styleUrls: ['./second-store.component.css']
})
export class SecondStoreComponent {

  products: Product[] = [];

  isAuth: boolean = false;
  auth=getAuth();
  constructor(private productService: ProductService, private authService: AuthService) { }

  //Retrive data when the component is initialized
  async ngOnInit() {
    await this.productService.getSecondHandProducts().then((products) => {
      this.products = products;
    });

    this.auth.onAuthStateChanged((user)=>{
      this.isAuth = user ? true : false;
    });
  }

  //rafraichit la page
  refresh=(): void =>{
    this.productService.getSecondHandProducts().then((products) => {
      this.products = products;
    });
  }

  //Delete a product
  isAuthOwner(product: Product): boolean {
    return this.authService.isAuthOwner(product);
  }


}
