import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { FileStorage } from '../file-storage';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private formBuilder: FormBuilder,private uploadService: StorageService , private prod: ProductService) {
    this.formControl = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      // file:['', Validators.required]
    });
  }

  @Input() refresh: any;
  @Input() isMainShop: boolean = false;
  formControl: FormGroup;
  showModal = false;

  videoSrc: string="";
  selectedFile?: File;
  currentFileUpload?: FileStorage;
  percentage = 0;

  //modal open/close
  toggleModal(){
    this.showModal = !this.showModal;
  }

  //take the image file
  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  //upload the image file to firebase storage
  upload(id: string): void {
    
    if (this.selectedFile) {
      const file: File | null = this.selectedFile;
      this.selectedFile = undefined;
      console.log(file);
      if (file) {
        this.currentFileUpload = new FileStorage(file);
        console.log(this.currentFileUpload);
        this.uploadService.pushFileToStorage(this.currentFileUpload, id).then(() => {
          this.refresh();
        }).catch(
          error => {
            console.log(error);
          }
        );
      }
    }
  }
  //submit the form
  async onSubmit() {
    if (this.formControl.valid) {
      let id: string = "";
      if (this.isMainShop) {
        await this.prod.addNewProduct(this.formControl.value).then((_id: string) => {
          _id ? id = _id : id = "";
        });
        this.formControl.reset();
        this.toggleModal();
      }

      else {
        await this.prod.addNewSecondHandProduct(this.formControl.value).then((_id: string) => {
          _id ? id = _id : id = "";
        });
        this.formControl.reset();
        this.toggleModal();
      }
      this.upload(id);
    } else {
      console.error('Le formulaire est invalide');
    }
  }
}
