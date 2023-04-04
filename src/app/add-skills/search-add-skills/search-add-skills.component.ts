import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from "@angular/material/paginator";
import { Ilookup, ISearchResult, ISelectedTechs, ISaveObject, Iuser } from 'src/app/shared/interfaces';
import { AddSkillsWrapperService } from '../add-skills-wrapper/add-skils-wrapper.service';

@Component({
  selector: 'app-search-add-skills',
  templateUrl: './search-add-skills.component.html',
  styleUrls: ['./search-add-skills.component.css']
})
export class SearchAddSkillsComponent implements OnInit, OnDestroy, OnChanges {
  subsriptions: Subscription[] = [];
  @Input("searchResult") searchResult: ISearchResult[] = [];
  @Input('loggedinUser') loggedinUser: Iuser | null = null;
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter();
  @Input("expertLevels") expertLevels: Ilookup[] = [];
  selectedTechStacks: ISelectedTechs[] = [];
  showTechStackValidationError = false;
  showExpertLevelMissingError = false;
  pageSize = 1;
  paginatorConfig = {
    startIndex: 0,
    endIndex: this.pageSize
  }

  constructor(
    private addSkillsWrapperService: AddSkillsWrapperService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.["searchResult"] && !changes?.["searchResult"].firstChange) {
      this.searchResult.map(el => {
        if (el.techStacks?.length) {
          el.techStacks.map(t => t.isSelected = false);
        }
      });
    }
  }
  ngOnInit(): void { }
  ngOnDestroy(): void { }
  selectTech(techObj: Ilookup, result: ISearchResult) {
    const foundInSelectedTechStack = this.selectedTechStacks.find(el => el.techCode === techObj.c && el.categoryCode === result.categoryCode
      && el.skillGroupCode === result.skillGroupCode);
    if (foundInSelectedTechStack) {
      this.selectedTechStacks = this.selectedTechStacks.filter(el => !(el.techCode === techObj.c && el.categoryCode === result.categoryCode
        && el.skillGroupCode === result.skillGroupCode));
      this.updateIsSelectedFlag(false, techObj, result);
      const radioName = result.id + '_' + techObj.c;
      const radioButtons = document.getElementsByName(radioName);
      if (radioButtons?.length) {
        Array.prototype.forEach.call(radioButtons, (element) => element.checked = false);
      }
      this.searchResult.map(el => {
        if (el.techStacks?.length) {
          el.techStacks.map(t => {
            if (t.c === techObj.c) {
              t.isSelected = false;
            }
          });
        }
      });
    } else {
      const selectedTechStackObj: ISelectedTechs = {
        techCode: techObj.c, categoryCode: result.categoryCode, expertCode: '', skillGroupCode: result.skillGroupCode
      };
      this.selectedTechStacks.push(selectedTechStackObj);
      this.updateIsSelectedFlag(true, techObj, result);
    }
    this.showTechStackValidationError = !this.selectedTechStacks?.length ? true : false;
    this.showExpertLevelMissingError = this.selectedTechStacks.find(el => !el.expertCode) ? true : false;
  }
  updateIsSelectedFlag(flag: boolean, techObj: Ilookup, result: ISearchResult) {
    const resultFound = this.searchResult.find(r => r.id === result.id);
    if (resultFound) {
      const techFound = resultFound.techStacks.find(t => techObj.c === t.c);
      if (techFound) {
        resultFound.techStacks.map(el => {
          if (el.c === techObj.c) { el.isSelected = flag; }
        });
      }
    }
  }
  selectExpertLevel(techObj: Ilookup, expertLevelObj: Ilookup, result: ISearchResult) {
    const found = this.selectedTechStacks.find(el => (el.techCode === techObj.c && el.categoryCode === result.categoryCode
      && el.skillGroupCode === result.skillGroupCode));
    if (found) { found.expertCode = expertLevelObj.c; }
    this.showExpertLevelMissingError = this.selectedTechStacks.find(el => !el.expertCode) ? true : false;
  }
  submitSkill() {
    if (!this.selectedTechStacks?.length) {
      this.showTechStackValidationError = true;
    } else {
      const isAnyLevelMissing = this.selectedTechStacks.find(el => !el.expertCode);
      if (isAnyLevelMissing) {
        this.showExpertLevelMissingError = true;
      } else {
        const obj: ISaveObject = { eid: "2886", techStacks: this.selectedTechStacks };
        console.log(obj);
        this.addSkillsWrapperService.updateShowLoaderStream(true);
        setTimeout(() => {
          this.addSkillsWrapperService.updateShowLoaderStream(false);
          this.cancelSearch();
        }, 1000);
      }
    }
  }
  cancelSearch() {
    this.showTechStackValidationError = false;
    this.showExpertLevelMissingError = false;
    this.selectedTechStacks = [];
    this.searchResult = [];
    this.onCancel.emit(true);
  }
  getPaginatorData(event: PageEvent): PageEvent {
    this.paginatorConfig.startIndex = event.pageIndex * event.pageSize;
    this.paginatorConfig.endIndex = this.paginatorConfig.startIndex + event.pageSize;
    return event;
  }
}
