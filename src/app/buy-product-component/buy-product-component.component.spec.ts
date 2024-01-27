import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProductComponentComponent } from './buy-product-component.component';

describe('BuyProductComponentComponent', () => {
  let component: BuyProductComponentComponent;
  let fixture: ComponentFixture<BuyProductComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyProductComponentComponent]
    });
    fixture = TestBed.createComponent(BuyProductComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
