import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule  } from "@angular/forms";

import { DefaultAddSkillsComponent } from './default-add-skills.component';

describe('DefaultAddSkillsComponent', () => {
  let component: DefaultAddSkillsComponent;
  let fixture: ComponentFixture<DefaultAddSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultAddSkillsComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultAddSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
