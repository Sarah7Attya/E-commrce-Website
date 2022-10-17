import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveProductsComponent } from './remove-products.component';

describe('RemoveProductsComponent', () => {
  let component: RemoveProductsComponent;
  let fixture: ComponentFixture<RemoveProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
