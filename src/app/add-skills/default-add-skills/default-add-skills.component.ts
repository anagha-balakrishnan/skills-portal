import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, forkJoin } from 'rxjs';

import { CustomFormValidationService } from '../../shared/services/custom-form-validation.service';
import { DefaultAddSkillsService } from './default-add-skills.service';
import { Ilookup, ISaveObject, ISelectedTechs, Iuser } from '../../shared/interfaces';
import { CommonService } from 'src/app/shared/services/common.service';
import { AddSkillsWrapperService } from '../add-skills-wrapper/add-skils-wrapper.service';

@Component({
  selector: 'app-default-add-skills',
  templateUrl: './default-add-skills.component.html',
  styleUrls: ['./default-add-skills.component.css']
})
export class DefaultAddSkillsComponent implements OnInit, OnDestroy {
  skillsForm: FormGroup;
  practices: Ilookup[] = [];
  subscriptions: Subscription[] = [];
  expertLevels: Ilookup[] = [];
  categories: Ilookup[] = [];
  techStacks: Ilookup[] = [];
  selectedTechStacks: ISelectedTechs[] = [];
  showTechStackValidationError = false;
  showExpertLevelMissingError = false;
  loggedInUser: Iuser = { eid: '', empName: '' };

  constructor(
    private customFormValidationService: CustomFormValidationService,
    private service: DefaultAddSkillsService,
    private commonService: CommonService,
    private addSkillsWrapperService: AddSkillsWrapperService
  ) {

    this.skillsForm = new FormGroup({
      empName: new FormControl('', [Validators.required, this.customFormValidationService.whiteSpaceValidator()]),
      practice: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
    this.subscriptions.push(this.commonService.loggedInUserStream$
      .subscribe((user: Iuser | null) => {
        if (user?.eid) {
          this.loggedInUser = user;
          if (this.skillsForm) {
            this.skillsForm.controls["empName"].setValue(user.empName);
            this.skillsForm.controls["empName"].disable();
          }
        }
      }));
  }
  ngOnInit(): void {
    this.skillsForm.controls['practice'].valueChanges.subscribe(val => {
      if (val) {
        this.skillsForm.controls['category'].setValue('');
        this.selectedTechStacks = [];
        this.techStacks = [];
        this.skillsForm.controls['category'].enable();
        this.addSkillsWrapperService.updateShowLoaderStream(true);
        this.onChange(true, val);
      }
    });
    this.skillsForm.controls['category'].valueChanges.subscribe(val => {
      if (val) {
        this.addSkillsWrapperService.updateShowLoaderStream(true);
        this.selectedTechStacks = [];
        this.techStacks = [];
        this.onChange(false, val);
      }
    });
    if (!this.loggedInUser?.eid) {
      this.commonService.getLoggedInUser();
    }
    this.skillsForm.controls['category'].disable();
    const promises = [this.service.getPractices(),
    this.service.getExperts()];
    this.subscriptions.push(
      forkJoin(promises)
        .subscribe({
          next: res => {
            this.practices = res[0]?.length ? res[0] : [];
            this.expertLevels = res[1]?.length ? res[1] : []
          }, error: (e) => { }
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }

  onChange(isPractice: boolean, code: any) {
    const promise = isPractice ? this.service.getCategories() : this.service.getTechStacks(code,
      this.skillsForm.controls['practice'].value);
    setTimeout(() => {
      this.addSkillsWrapperService.updateShowLoaderStream(false);
      this.subscriptions.push(
        promise
          .subscribe({
            next: res => {
              if (isPractice) {
                this.categories = res?.length ? res : []
              } else {
                this.techStacks = res?.length ? res : [];
                if (this.techStacks?.length && this.expertLevels?.length) {
                  this.techStacks.map(el => el.isSelected = false);
                }
              }
            }, error: () => { }
          })
      );
    }, 1000);
  }

  selectTech(techObj: Ilookup) {
    const found = this.selectedTechStacks.find(el => el.techCode === techObj.c);
    if (found) {
      this.selectedTechStacks = this.selectedTechStacks.filter(el => el.techCode !== techObj.c);
      this.updateIsSelectedFlag(techObj, false);
      const radioButtons = document.getElementsByName(techObj.c);
      if (radioButtons?.length) {
        Array.prototype.forEach.call(radioButtons, (element) => element.checked = false);
      }
    } else {
      this.selectedTechStacks.push({
        techCode: techObj.c, expertCode: '', categoryCode: this.skillsForm.controls['category'].value,
        skillGroupCode: this.skillsForm.controls['practice'].value
      });
      this.updateIsSelectedFlag(techObj);
    }
    this.showTechStackValidationError = !this.selectedTechStacks?.length ? true : false;
    this.showExpertLevelMissingError = this.selectedTechStacks.find(el => !el.expertCode) ? true : false;
  }
  updateIsSelectedFlag(techObj: Ilookup, flag = true) {
    this.techStacks.map(el => {
      if (el.c === techObj.c) { el.isSelected = flag; }
    });
  }
  selectExpertLevel(techObj: Ilookup, expertLevelObj: Ilookup) {
    const found = this.selectedTechStacks.find(el => el.techCode === techObj.c);
    if (found) { found.expertCode = expertLevelObj.c; }
    this.showExpertLevelMissingError = this.selectedTechStacks.find(el => !el.expertCode) ? true : false;
  }
  submitSkill() {
    if (!this.selectedTechStacks?.length) {
      this.showTechStackValidationError = true;
      if (this.skillsForm.invalid) { this.skillsForm.markAllAsTouched(); }
    } else {
      const isAnyLevelMissing = this.selectedTechStacks.find(el => !el.expertCode);
      if (isAnyLevelMissing) {
        this.showExpertLevelMissingError = true;
      } else {
        const obj: ISaveObject = { eid: this.loggedInUser.eid, techStacks: this.selectedTechStacks };
        console.log(obj);
        this.addSkillsWrapperService.updateShowLoaderStream(true);
        setTimeout(() => {
          this.addSkillsWrapperService.updateShowLoaderStream(false);
          this.resetSkills();
        }, 1000);
      }
    }
  }
  resetSkills() {
    this.skillsForm.reset();
    this.skillsForm.controls["empName"].setValue(this.loggedInUser.empName);
    this.skillsForm.controls['category'].setValue('');
    this.skillsForm.controls['practice'].setValue('');
    this.skillsForm.controls['category'].disable();
    this.techStacks = [];
    this.selectedTechStacks = [];
    this.showTechStackValidationError = false;
    this.showExpertLevelMissingError = false;
  }
}
