import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppProductComponent } from './supp-product.component';

describe('SuppProductComponent', () => {
  let component: SuppProductComponent;
  let fixture: ComponentFixture<SuppProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
