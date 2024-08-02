import { TestBed } from '@angular/core/testing';

import { CloudinaryUplodService } from './cloudinary-uplod.service';

describe('CloudinaryUplodService', () => {
  let service: CloudinaryUplodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudinaryUplodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
