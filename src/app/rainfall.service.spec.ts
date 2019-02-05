import { TestBed } from '@angular/core/testing';

import { RainfallService } from './rainfall.service';

describe('RainfallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RainfallService = TestBed.get(RainfallService);
    expect(service).toBeTruthy();
  });
});
