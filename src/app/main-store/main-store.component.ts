import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-main-store',
  templateUrl: './main-store.component.html',
  styleUrls: ['./main-store.component.css']
})
export class MainStoreComponent {  

  products: any[] = [];
  modalOpen = false;
  isSeller: boolean = false;
  auth = getAuth();

  constructor(private prod : ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.prod.getShopProducts().then((products) => {
      this.products = products;
    });

    this.auth.onAuthStateChanged(() => this.authService.isSeller().then((isSeller) => {
      this.isSeller = isSeller;
    }));
    
  }
  
  refresh=(): void =>{
    this.prod.getShopProducts().then((products) => {
      this.products = products;
    });
  }
}
