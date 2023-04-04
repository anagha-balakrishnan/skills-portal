import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin, Subscription } from "rxjs";
import { Ilookup, ISearchResult, Iuser } from 'src/app/shared/interfaces';
import { CustomFormValidationService } from '../../shared/services/custom-form-validation.service';
import { AddSkillsWrapperService } from "./add-skils-wrapper.service";
import { DefaultAddSkillsService } from '../default-add-skills/default-add-skills.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-add-skills-wrapper',
  templateUrl: './add-skills-wrapper.component.html',
  styleUrls: ['./add-skills-wrapper.component.css']
})
export class AddSkillsWrapperComponent implements OnInit, OnDestroy {

  pageTitle = "Add new skills";
  searchForm: FormGroup;
  showDefaultAddSkills = true;
  showLoader = false;
  searchResult: ISearchResult[] = [];
  expertLevels: Ilookup[] = [];
  subscriptions: Subscription[] = [];
  noResultsMsg: boolean = false;
  loggedInUser: Iuser | null = null;
  validStringErr = 'Enter a valid string';

  constructor(
    private customFormValidationService: CustomFormValidationService,
    private service: AddSkillsWrapperService,
    private defaultAddSkillsService: DefaultAddSkillsService,
    private commonService: CommonService
  ) {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl('',
        [Validators.required, this.customFormValidationService.whiteSpaceValidator(), Validators.minLength(3)])
    });
    this.subscriptions.push(this.commonService.loggedInUserStream$
      .subscribe((user: Iuser | null) => {
        if (user) {
          this.loggedInUser = user;
        } else {
          this.loggedInUser = null;
        }
      }));
    this.subscriptions.push(this.service.showLoaderStream$
      .subscribe(flag => { this.showLoader = flag; }));
  }
  ngOnDestroy(): void {
    this.subscriptions.map(sub => sub.unsubscribe());
    this.subscriptions = [];
  }
  ngOnInit(): void {
    this.commonService.getLoggedInUser();
    const promises = [
      this.defaultAddSkillsService.getExperts()
    ];
    this.subscriptions.push(
      forkJoin(promises).subscribe({
        next: (responses) => {
          this.expertLevels = responses[0] ? responses[0] : [];
        },
        error: () => { },
        complete: () => { }
      })
    );
  }

  resetSearchForm() {
    this.searchForm.reset();
    this.noResultsMsg = false;
  }

  searchSkill() {
    if (this.searchForm.valid) {
      this.searchResult = [];
      this.showLoader = true;
      setTimeout(() => {
        this.service.searchSkills(this.searchForm.controls['searchQuery'].value)
          .subscribe({
            next: res => {
              if (Array.isArray(res) && res?.length) {
                this.noResultsMsg = false;
                this.searchResult = res;
              } else {
                this.showDefaultAddSkills = false;
                this.noResultsMsg = true;
              }
            },
            error: () => { }, complete: () => { this.showLoader = false; }
          })
      }, 1000);
      // throttling
      this.showDefaultAddSkills = false;
    } else {
      this.searchForm.controls['searchQuery'].markAsDirty();
    }
  }
  onCancelofSearch(flag: boolean) {
    if (flag) {
      this.showDefaultAddSkills = true;
      this.resetSearchForm();
    }
  }
}
