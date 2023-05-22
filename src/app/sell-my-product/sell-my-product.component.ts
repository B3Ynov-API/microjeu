import { Component, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-sell-my-product',
  templateUrl: './sell-my-product.component.html',
  styleUrls: ['./sell-my-product.component.css']
})
export class SellMyProductComponent {
  constructor(private prod : ProductService, private auth : AuthService) { }

  @Input() product: Product= { id: '', name: '', price: 0, description: '', image: '' };
  showModal = false;

  //add the product to the owner
  sellMyProduct(){
    this.prod.addProductToOwner(this.product.id, this.auth.getUserId());
    this.toggleModal();
  }

  //modal open/close
  toggleModal(){
    this.showModal = !this.showModal;
  }
}
