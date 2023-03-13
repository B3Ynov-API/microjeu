import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private formBuilder: FormBuilder, private prod: ProductService) {
    this.formControl = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  @Input() refresh: any;
  @Input() isMainShop: boolean = false;
  formControl: FormGroup;
  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  async onSubmit() {
    if (this.formControl.valid) {
      if (this.isMainShop) {
        await this.prod.addNewProduct(this.formControl.value).then(() => { this.refresh() });
        this.formControl.reset();
        this.toggleModal();
      }

      else {
        await this.prod.addNewSecondHandProduct(this.formControl.value).then(() => { this.refresh() });
        this.formControl.reset();
        this.toggleModal();
      }
    } else {
      console.error('Le formulaire est invalide');
    }
  }
}
