import { Component, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { Product } from '../product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sell-my-product',
  templateUrl: './sell-my-product.component.html',
  styleUrls: ['./sell-my-product.component.css']
})
export class SellMyProductComponent {
  constructor(private formBuilder: FormBuilder,private prod : ProductService, private auth : AuthService) {this.formControl = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
  }); }

  @Input() product: Product= { id: '', name: '', price: 0, description: '', image: '' };
  showModal = false;
  formControl: FormGroup;

  ngOnInit(): void {
    this.formControl.controls['name'].setValue(this.product.name);
    this.formControl.controls['price'].setValue(this.product.price);
    this.formControl.controls['description'].setValue(this.product.description);
  }

  //sell the product
  sellMyProduct(){
    if (this.formControl.valid) {
      this.prod.sellMyProduct(this.product.id, this.auth.getUserId());
      this.toggleModal();
    }
    else{
      console.error('Le formulaire est invalide');
    }
  }

  //modal open/close
  toggleModal(){
    this.showModal = !this.showModal;
  }
}
