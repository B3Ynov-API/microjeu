import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() {}
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  async getShopProducts() {
    const productsCol = collection(this.db, 'shopProducts');
    const productSnapshot = await getDocs(productsCol);
    const productList = productSnapshot.docs.map(doc => doc.data());
    return productList;
  }

  async addNewProduct(data : any) {
    const productsCol = collection(this.db, 'shopProducts');
    await addDoc(productsCol, data);
  }
}
