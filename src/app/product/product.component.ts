import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: any;
  @Input() myProduct: any;

  isMine: boolean=false;
  ngOnInit(){
    if(this.myProduct){
      this.isMine=true;
    }
  }
}
