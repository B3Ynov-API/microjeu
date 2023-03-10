import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdProductComponent } from './upd-product.component';

describe('UpdProductComponent', () => {
  let component: UpdProductComponent;
  let fixture: ComponentFixture<UpdProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
