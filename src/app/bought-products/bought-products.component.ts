import { Component, Input } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-bought-products',
  templateUrl: './bought-products.component.html',
  styleUrls: ['./bought-products.component.css']
})
export class BoughtProductsComponent {

  constructor(private prod : ProductService, private auth : AuthService) { }

  @Input() product: Product= { id: '', name: '', price: 0, description: '', image: '' };
  showModal = false;

  //add the product to the owner
  addProductToOwner(){
    this.prod.addProductToOwner(this.product.id, this.auth.getUserId());
    this.toggleModal();
  }

  //modal open/close
  toggleModal(){
    this.showModal = !this.showModal;
  }
}
