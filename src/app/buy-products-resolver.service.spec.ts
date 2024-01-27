import { TestBed } from '@angular/core/testing';

import { BuyProductsResolverService } from './buy-products-resolver.service';

describe('BuyProductsResolverService', () => {
  let service: BuyProductsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyProductsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
