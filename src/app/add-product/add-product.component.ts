import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private formBuilder: FormBuilder, private prod : ProductService) {
  this.shareForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  @Input() truc: any;
  shareForm: FormGroup;
  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }
  async onSubmit() {
    if (this.shareForm.valid) {
      console.log(this.shareForm.value);
      await this.prod.addNewProduct(this.shareForm.value).then(() => {console.log(this.truc())});
      this.shareForm.reset();
      this.toggleModal();
    } else {
      console.error('Le formulaire est invalide');
    }
  }
}
