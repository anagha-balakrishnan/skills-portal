import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from "ngx-loading";
import { MatPaginatorModule } from '@angular/material/paginator';

import { AddSkillsWrapperComponent } from './add-skills-wrapper/add-skills-wrapper.component';
import { DefaultAddSkillsComponent } from './default-add-skills/default-add-skills.component';
import { SearchAddSkillsComponent } from './search-add-skills/search-add-skills.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddSkillsWrapperComponent,
    DefaultAddSkillsComponent,
    SearchAddSkillsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { title: 'Add Skills Portal', path: '', pathMatch: 'full', component: AddSkillsWrapperComponent }
    ]),
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    MatPaginatorModule,
    SharedModule
  ]
})
export class AddSkillsModule { }
