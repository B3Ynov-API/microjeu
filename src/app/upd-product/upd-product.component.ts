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
    this.formControl = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
    }
    @Input() refresh: any;
<<<<<<< HEAD
    @Input() product: Product= {id: '', name: '', price: 0, description: '', image: ''};
    shareForm: FormGroup;
=======
    @Input() product: Product= { id: '', name: '', price: 0, description: '', image: '' };
    @Input() isMainShop: boolean = false;
    formControl: FormGroup;
>>>>>>> bec2260c810573dd181948f7253170f63549827e
    showModal = false;
    toggleModal(){
      this.showModal = !this.showModal;
    }

    ngOnInit(): void {
      this.formControl.controls['name'].setValue(this.product.name);
      this.formControl.controls['price'].setValue(this.product.price);
      this.formControl.controls['description'].setValue(this.product.description);
    }

    async onSubmit() {
      if (this.formControl.valid) {
        if (this.isMainShop) {
          await this.prod.updateProduct(this.product.id,this.formControl.value);
        }
        else {
          await this.prod.updateSecondHandProduct(this.product.id, this.formControl.value);
        }
        this.formControl.reset();
        this.toggleModal();
        this.refresh();
      } else {
        console.error('Le formulaire est invalide');
      }
    }
}
