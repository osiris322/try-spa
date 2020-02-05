import { TestBed } from '@angular/core/testing';

import { FilialService } from './filial.service';

describe('FilialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilialService = TestBed.get(FilialService);
    expect(service).toBeTruthy();
  });
});
