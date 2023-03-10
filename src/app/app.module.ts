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
import { MainStoreComponent } from './main-store/main-store.component';
import { ShopProductComponent } from './shop-product/shop-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdProductComponent } from './upd-product/upd-product.component';
import { SuppProductComponent } from './supp-product/supp-product.component';
import { BoughtProductComponent } from './bought-product/bought-product.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainStoreComponent,
    ShopProductComponent,
    AddProductComponent,
    UpdProductComponent,
    SuppProductComponent,
    BoughtProductComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
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
    ]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
