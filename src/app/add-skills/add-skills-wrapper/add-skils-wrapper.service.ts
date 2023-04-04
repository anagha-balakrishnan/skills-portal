import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';

import { SEARCH_RESULTS, TECH_STACKS, DEFAULT_USER, PRACTICES, CATEGORIES } from '../../shared/data';
import { Ilookup, ISearchResult, Iuser } from '../../shared/interfaces';
@Injectable({
  providedIn: 'root'
})

export class AddSkillsWrapperService {

  searchResults: ISearchResult[] = SEARCH_RESULTS;
  showLoaderStream = new Subject<boolean>;
  showLoaderStream$ = this.showLoaderStream.asObservable();
  constructor() { }

  searchSkills(query: string): Observable<any> {
    return this.getSearchedSkillFromDB(query);
  }
  getSearchedSkillFromDB(query: string): Observable<ISearchResult[] | string | Error> {  // Mocking search function
    if (query) {
      const techStacks: Ilookup[] = TECH_STACKS; // geting all techstacks stored in db
      if (techStacks?.length) { // filter the name that matches with the query
        const filtered = techStacks.filter(t => t.n.toLowerCase().indexOf(query.toLowerCase()) > -1);
        if (filtered?.length) {
          // create a search object before returning the result
          const userDetails: Iuser = DEFAULT_USER;
          const result: ISearchResult[] = this.createSearchResultObject(userDetails, filtered);
          return of(result);
        } else {
          return of('No results found');
        }
      } else { return of('No results found'); }
    } else {
      throw throwError(() => { new Error('Bad Request') });
    }
  }
  createSearchResultObject(userDetails: Iuser, techStacks: any[]): ISearchResult[] {
    const searchResult: ISearchResult[] = this.createIsearchResultList(techStacks);
    return searchResult;
  }
  createIsearchResultList(techStacks: any[]): ISearchResult[] {
    let results: ISearchResult[] = [];
    const practices: Ilookup[] = PRACTICES;
    const categories: Ilookup[] = CATEGORIES;
    let id = 1;
    techStacks.map(t => {
      if (results.findIndex(r => r.categoryCode === t.cc && r.skillGroupCode === t.pc) === -1) {
        const cc = categories.find(c => c.c === t.cc);
        const pc = practices.find(p => p.c === t.pc);
        if (cc && pc) {
          results.push({
            id: (id++).toString(), categoryCode: cc.c, categoryName: cc.n, skillGroupCode: pc.c, skillGroupName: pc.n, techStacks: [
              { id: t.id, c: t.c, n: t.n }
            ]
          });
        }
      } else {
        const found = results.find(r => r.categoryCode === t.cc && r.skillGroupCode === t.pc);
        if (found) {
          found.techStacks.push({ id: t.id, c: t.c, n: t.n });
        }
      }
    });
    return results;
  }
  updateShowLoaderStream(flag: boolean){
    this.showLoaderStream.next(flag);
  }
}