import { TestBed } from '@angular/core/testing';

import { DefaultAddSkillsService } from './default-add-skills.service';

describe('DefaultAddSkillsService', () => {
  let service: DefaultAddSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultAddSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
