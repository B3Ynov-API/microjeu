import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondStoreComponent } from './second-store.component';

describe('SecondStoreComponent', () => {
  let component: SecondStoreComponent;
  let fixture: ComponentFixture<SecondStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
