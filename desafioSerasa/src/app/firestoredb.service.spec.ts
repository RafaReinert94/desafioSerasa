import { TestBed } from '@angular/core/testing';

import { FirestoredbService } from './firestoredb.service';

describe('FirestoredbService', () => {
  let service: FirestoredbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoredbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
