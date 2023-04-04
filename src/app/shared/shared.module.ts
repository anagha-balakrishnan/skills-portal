import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelCheckedPipe } from './pipes/level-checked.pipe';



@NgModule({
  declarations: [
    LevelCheckedPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LevelCheckedPipe
  ]
})
export class SharedModule { }
