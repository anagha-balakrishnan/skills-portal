import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Ilookup } from 'src/app/shared/interfaces';

import { CATEGORIES, TECH_STACKS, EXPERT_LEVELS, PRACTICES } from '../../shared/data';

@Injectable({
  providedIn: 'root'
})
export class DefaultAddSkillsService {
  practices: Ilookup[] = PRACTICES;
  expertLevels: Ilookup[] = EXPERT_LEVELS;
  techStacks: Ilookup[] = TECH_STACKS;
  categories: Ilookup[] = CATEGORIES;

  constructor() { }

  getPractices() {
    return of(this.practices);
  }
  getExperts() {
    return of(this.expertLevels);
  }
  getTechStacks(c: string) {
    let filteredList: Ilookup[] = [];
    if (this.techStacks) {
      filteredList = this.techStacks.filter(el => el.cc === c);
    }
    return of(filteredList.length ? filteredList : []);
  }
  getCategories() {
    return of(this.categories);
  }
}
