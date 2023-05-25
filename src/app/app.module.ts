import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { MainStoreComponent } from './main-store/main-store.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdProductComponent } from './upd-product/upd-product.component';
import { SuppProductComponent } from './supp-product/supp-product.component';
// import { BoughtProductComponent } from './bought-product/bought-product.component';
import { PERSISTENCE } from '@angular/fire/compat/auth';

import { SecondStoreComponent } from './second-store/second-store.component';
import { ProductComponent } from './product/product.component';
import { AngularFireModule } from '@angular/fire/compat';
import { BoughtProductsComponent } from './bought-products/bought-products.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { SellMyProductComponent } from './sell-my-product/sell-my-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainStoreComponent,
    AddProductComponent,
    UpdProductComponent,
    SignUpComponent,
    SignInComponent,
    SecondStoreComponent,
    ProductComponent,
    SuppProductComponent,
    BoughtProductsComponent,
    MyProductsComponent,
    SellMyProductComponent,
    // BoughtProductComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: 'mainStore',
        component: MainStoreComponent,
      },
      {
        path: 'secondStore',
        component: SecondStoreComponent
      },
      {
        path: 'signUp',
        component: SignUpComponent,
      },
      {
        path: 'signIn',
        component: SignInComponent,
      },
      {
        path: 'mainStore',
        component: MainStoreComponent,
      },
      {
        path: 'myProducts',
        component: MyProductsComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/mainStore',
      },
    ]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'local' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
