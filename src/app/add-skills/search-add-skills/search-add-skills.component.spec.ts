import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from "@angular/forms";

import { SearchAddSkillsComponent } from './search-add-skills.component';

describe('SearchAddSkillsComponent', () => {
  let component: SearchAddSkillsComponent;
  let fixture: ComponentFixture<SearchAddSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchAddSkillsComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchAddSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
