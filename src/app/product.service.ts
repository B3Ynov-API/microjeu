import { Product } from './product.interface';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { environment } from 'src/environments/environment';
import { getAuth } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() {}
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  auth = getAuth();

  async getShopProducts() {
    try {
      const productsCol = collection(this.db, 'shopProducts');
      const productSnapshot = await getDocs(productsCol);
      const productList = productSnapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data } as Product;
      });
      return productList;
    }
    catch (error) {
      console.log(error);
    }
    return [];
  }

  async addNewProduct(data : any) {
    const productsCol = collection(this.db, 'shopProducts');
    addDoc(productsCol, data).catch((error) => {console.log(error)});
  }

  async deleteProduct(id : string) {
    const productsCol = collection(this.db, 'shopProducts');
    deleteDoc(doc(productsCol, id)).catch((error) => {console.log(error)});
  }

  async updateProduct(id : string, data : any) {
    const productsCol = collection(this.db, 'shopProducts');
    updateDoc(doc(productsCol, id), data).catch((error) => {console.log(error)});
  }

  async getSecondHandProducts() {
    try {
      const productsCol = collection(this.db, 'secondHandProducts');
      const productSnapshot = await getDocs(productsCol);
      const productList = productSnapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data } as Product;
      });
      return productList;
    }
    catch (error) {
      console.log(error);
    }
    return [];
  }

  async addNewSecondHandProduct(data : any) {
    const productsCol = collection(this.db, 'secondHandProducts');
    addDoc(productsCol, {
      ...data,
      owner: this.auth.currentUser?.uid
    }).catch((error) => {console.log(error)});
  }

  async deleteSecondHandProduct(id : string) {
    const productsCol = collection(this.db, 'secondHandProducts');
    deleteDoc(doc(productsCol, id)).catch((error) => {console.log(error)});
  }

  async updateSecondHandProduct(id : string, data : any) {
    const productsCol = collection(this.db, 'secondHandProducts');
    updateDoc(doc(productsCol, id), data).catch((error) => {console.log(error)});
  }
}
