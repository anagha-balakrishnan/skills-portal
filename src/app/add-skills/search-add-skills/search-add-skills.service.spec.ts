import { TestBed } from '@angular/core/testing';

import { SearchAddSkillsService } from './search-add-skills.service';

describe('SearchAddSkillsService', () => {
  let service: SearchAddSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchAddSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
