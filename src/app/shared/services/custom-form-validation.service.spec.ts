import { TestBed } from '@angular/core/testing';

import { CustomFormValidationService } from './custom-form-validation.service';

describe('CustomFormValidationService', () => {
  let service: CustomFormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomFormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
