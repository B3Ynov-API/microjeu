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
  showModal = false;
  async deleteProd(id: string) {
    this.toggleModal();
    await this.prod.deleteProduct(id).then(() => {this.refresh()});
  }
  toggleModal(){
    this.showModal = !this.showModal;
  }
}
