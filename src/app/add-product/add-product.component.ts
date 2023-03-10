import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
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
      img: ['', Validators.required],
    });
  }
  
  @Input() refresh: any;
  shareForm: FormGroup;
  showModal = false;
  base64Output : string="";

  toggleModal(){
    this.showModal = !this.showModal;
  }
  async onSubmit() {
    if (this.shareForm.valid) {
      await this.prod.addNewProduct(this.shareForm.value).then(() => {this.refresh()});
      this.shareForm.reset();
      this.toggleModal();
    } else {
      console.error('Le formulaire est invalide');
    }
  }
}
