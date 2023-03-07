import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { environment } from 'src/environments/environment';
import { SecondHandProduct } from './second-hand-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  constructor() {}

  async getSecondHandProducts() {
    const productsCol = collection(this.db, 'secondHandProducts');
    const productSnapshot = await getDocs(productsCol);
    const productList = productSnapshot.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data } as SecondHandProduct;
    });
    return productList;
  }
}
