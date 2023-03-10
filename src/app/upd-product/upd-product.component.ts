import { Product } from './../product.interface';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-upd-product',
  templateUrl: './upd-product.component.html',
  styleUrls: ['./upd-product.component.css']
})
export class UpdProductComponent {
  constructor(private formBuilder: FormBuilder, private prod : ProductService) {
    this.shareForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
    }
    @Input() refresh: any;
    @Input() product: Product= {id: '', name: '', price: 0, description: '', image: ''};
    shareForm: FormGroup;
    showModal = false;
    toggleModal(){
      this.showModal = !this.showModal;
    }

    ngOnInit(): void {
      this.shareForm.controls['name'].setValue(this.product.name);
      this.shareForm.controls['price'].setValue(this.product.price);
      this.shareForm.controls['description'].setValue(this.product.description);
    }

    async onSubmit() {
      if (this.shareForm.valid) {
        await this.prod.updateProduct(this.product.id,this.shareForm.value).then(() => {this.refresh()});
        this.shareForm.reset();
        this.toggleModal();
      } else {
        console.error('Le formulaire est invalide');
      }
    }
}
