import { TestBed } from '@angular/core/testing';

import { NewsroomService } from './newsroom.service';

describe('NewsroomService', () => {
  let service: NewsroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
