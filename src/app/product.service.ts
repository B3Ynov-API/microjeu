import { Product } from './product.interface';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore/lite';
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
    const productList = productSnapshot.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data } as Product;
    });
    return productList;
  }

  async addNewProduct(data : any) {
    const productsCol = collection(this.db, 'shopProducts');
    await addDoc(productsCol, data);
  }

  async deleteProduct(id : any) {
    const productsCol = collection(this.db, 'shopProducts');
    await deleteDoc(doc(productsCol, id));
  }

  async updateProduct(id : any, data : any) {
    const productsCol = collection(this.db, 'shopProducts');
    await updateDoc(doc(productsCol, id), data);
  }
}
