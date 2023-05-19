import { Component, Input } from '@angular/core';
import { Product } from '../product.interface';

@Component({
  selector: 'app-bought-products',
  templateUrl: './bought-products.component.html',
  styleUrls: ['./bought-products.component.css']
})
export class BoughtProductsComponent {

  constructor() { }

  @Input() product: Product= { id: '', name: '', price: 0, description: '', image: '' };
  ngOnInit(): void {
  }  

  addProductToOwner(){
    // this.prod.addProductToOwner(this.product.id);
  }
}
