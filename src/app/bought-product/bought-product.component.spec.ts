import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtProductComponent } from './bought-product.component';

describe('BoughtProductComponent', () => {
  let component: BoughtProductComponent;
  let fixture: ComponentFixture<BoughtProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoughtProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoughtProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
