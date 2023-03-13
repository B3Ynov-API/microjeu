import { Component, Input } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-supp-product',
  templateUrl: './supp-product.component.html',
  styleUrls: ['./supp-product.component.css']
})
export class SuppProductComponent {

  constructor(private prod : ProductService) { }

  @Input() refresh: any;
  @Input() product: Product= {id: '', name: '', price: 0, description: '', image: ''};
  @Input() isMainShop: boolean = false;
  showModal = false;

  async deleteProd(id: string) {
    if (this.isMainShop) {
      await this.prod.deleteProduct(id);
    }
    else {
      await this.prod.deleteSecondHandProduct(id);
    }
    this.toggleModal();
    this.refresh();
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }
}
