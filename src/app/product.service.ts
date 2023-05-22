import { Product } from './product.interface';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, runTransaction } from 'firebase/firestore/lite';
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

  //get the products from the database
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

  //add a product to the owner and increment the number of products
  addProductToOwner(productId: string, userId: string) {
    const userRef = doc(this.db, 'users', userId, 'boughtProducts', productId); // Utilisez doc() au lieu de collection()

    return runTransaction(this.db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const increment = userData['number'] || 0;
        console.log(increment);
        transaction.update(userRef, {
          [productId]: true,
          number: increment + 1
        });
      } else {
        transaction.set(userRef, {
          [productId]: true,
          number: 1
        });
      }
    });
  }

  async getBoughtProducts(userId: string) {
    // const userRef = doc(this.db, 'users', userId, 'boughtProducts'); // Utilisez doc() au lieu de collection()
    try {
      const productsCol = collection(this.db, 'users', userId, 'boughtProducts');
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

  //add new product to the database
  async addNewProduct(data : any) {
    const productsCol = collection(this.db, 'shopProducts');
    let id: string = "";
    await addDoc(productsCol, data).then((data) =>{
      id = data.id;
    }).catch((error) => {console.log(error)});
    return id; 
  }

  //add product to t

  //delete product from the database
  async deleteProduct(id : string) {
    const productsCol = collection(this.db, 'shopProducts');
    await deleteDoc(doc(productsCol, id)).catch((error) => {console.log(error)});
  }

  //update product in the database
  async updateProduct(id : string, data : any) {
    const productsCol = collection(this.db, 'shopProducts');
    await updateDoc(doc(productsCol, id), data).catch((error) => {console.log(error)});
  }

  //get the second hand products from the database
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

  //add new second hand product to the database
  async addNewSecondHandProduct(data : any) {
    let id: string = "";
    const productsCol = collection(this.db, 'secondHandProducts');
    await addDoc(productsCol, {
      ...data,
      owner: this.auth.currentUser?.uid
    }).then(data => {
      id = data.id;
    }).catch((error) => {console.log(error)});
    return id;
  }

  //delete second hand product from the database
  async deleteSecondHandProduct(id : string) {
    const productsCol = collection(this.db, 'secondHandProducts');
    await deleteDoc(doc(productsCol, id)).catch((error) => {console.log(error)});
  }

  //update second hand product in the database
  async updateSecondHandProduct(id : string, data : any) {
    const productsCol = collection(this.db, 'secondHandProducts');
    await updateDoc(doc(productsCol, id), data).catch((error) => {console.log(error)});
  }
}
