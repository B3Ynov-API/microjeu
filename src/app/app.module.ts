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
import { ShopProductComponent } from './shop-product/shop-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdProductComponent } from './upd-product/upd-product.component';
import { SuppProductComponent } from './supp-product/supp-product.component';
import { BoughtProductComponent } from './bought-product/bought-product.component';
import { PERSISTENCE } from '@angular/fire/compat/auth';

import { SecondStoreComponent } from './second-store/second-store.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainStoreComponent,
    ShopProductComponent,
    AddProductComponent,
    UpdProductComponent,
    SignUpComponent,
    SignInComponent,
    SecondStoreComponent,
    ProductComponent,
    SuppProductComponent,
    BoughtProductComponent,
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
<<<<<<< HEAD
        path: 'myProducts',
        component: BoughtProductComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/mainStore',
      }, 
=======
        path: '**',
        pathMatch: 'full',
        redirectTo: '/mainStore',
      },
      {
        path: 'mainStore',
        component: MainStoreComponent,
      },
      {
        path: 'myProducts',
        component: BoughtProductComponent,
      },
>>>>>>> 714b6457e01d65194ce73c8bd6890dff1aa9cb10
    ]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'local' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
