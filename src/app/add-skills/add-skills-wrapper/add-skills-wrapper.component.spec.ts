import { CUSTOM_ELEMENTS_SCHEMA, ɵdevModeEqual } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from "@angular/forms";
import { CommonService } from 'src/app/shared/services/common.service';
import { AddSkillsWrapperComponent } from './add-skills-wrapper.component';
import { mockCommonService } from '../../test/mock-services/mock-common-service';


describe('AddSkillsWrapperComponent', () => {
  let component: AddSkillsWrapperComponent;
  let fixture: ComponentFixture<AddSkillsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSkillsWrapperComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
      providers: [{ provide: CommonService, useValue: mockCommonService },
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AddSkillsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get loggedIn user details', async () => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.loggedInUser?.eid).toBe('1234');
      expect(component.loggedInUser?.eid).not.toBe('2886');
    });
  });
  it('if the login details is empty from API, the loggedIn details should not have an employee Id', async () => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.loggedInUser).not.toBe(null);
      mockCommonService.loggedInUserStream.next(null);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.loggedInUser).toBe(null);
      });
    });
  });
  it('Once component is initialised there should be active subscriptions', () => {
    component.subscriptions = [];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.subscriptions.length).toBeGreaterThan(0);
  });
  it('Once component is destroyed, all subscriptions should be destroyed', async () => {
    component.ngOnDestroy();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.subscriptions.length).toEqual(0);
    });
  });
  it('TEST a Form Group ELEMENT COUNT', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#searchForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(1);
  });
  it('CHECK IF MANDATORY FIELD VALIDATION IS SHOWING for empty input', () => {
    const searchQueryUserInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#searchForm').querySelectorAll('input')[0];
    const searchQueryFromForm = component.searchForm.get('searchQuery');
    expect(searchQueryUserInput.value).toEqual(searchQueryFromForm?.value);
    expect(searchQueryFromForm?.errors).not.toBeNull();
    expect(searchQueryFromForm?.errors?.['required']).toBeTruthy();
  });
  it('CHECK SEARCH QUERY AFTER ENTERING SOME VALUE ', async () => {
    const searchQueryUserInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#searchForm').querySelectorAll('input')[0];
    searchQueryUserInput.value = "Angular";
    searchQueryUserInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const searchQueryFromForm = component.searchForm.get('searchQuery');
      expect(searchQueryUserInput.value).toEqual(searchQueryFromForm?.value);
      expect(searchQueryFromForm?.errors).toBeNull();
    });
  });
  it('SHOULD DISPLAY VALIDATION MESSAGE ON EMPTY SEARCH', async () => {
    const searchQueryFromForm = component.searchForm.get('searchQuery');
    const searchButton = fixture.debugElement.nativeElement.querySelector('#submit');
    searchButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const errorMessage = (fixture.debugElement.nativeElement.querySelector('#valid-string-error')).getInnerHTML();
      expect(errorMessage).not.toBeNull();
      expect(errorMessage.trim()).toBe('Enter a valid string');
      expect(errorMessage.trim()).not.toBe('To search, a word should be of 3 letters or more');
      expect(searchQueryFromForm?.errors).not.toBeNull();
      expect(searchQueryFromForm?.errors?.['required']).toBeTruthy();
      expect(searchQueryFromForm?.errors?.['invalid']).toBeTruthy();
    });
  });
  it('SHOULD DISPLAY VALIDATION MESSAGE ON WHITE SPACE SEARCH', async () => {
    const searchQueryFromForm = component.searchForm.get('searchQuery');
    const searchButton = fixture.debugElement.nativeElement.querySelector('#submit');
    const inputField = fixture.debugElement.nativeElement.querySelector('#searchForm').querySelectorAll('input')[0];
    inputField.value = '       ';
    inputField.dispatchEvent(new Event('input'));
    searchButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const errorMessage = (fixture.debugElement.nativeElement.querySelector('#valid-string-error')).getInnerHTML();
      expect(errorMessage.trim()).not.toBeNull();
      expect(errorMessage.trim()).toEqual('Enter a valid string');
      expect(errorMessage).not.toBe('To search, a word should be of 3 letters or more');
      expect(searchQueryFromForm?.errors).not.toBeNull();
      expect(searchQueryFromForm?.errors?.['invalid']).toBeTruthy();
    });
  });
});
