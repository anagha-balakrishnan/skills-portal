import { Pipe, PipeTransform } from '@angular/core';
import { Ilookup, ISelectedTechs } from '../interfaces';

@Pipe({
  name: 'levelChecked'
})
export class LevelCheckedPipe implements PipeTransform {

  transform(level: Ilookup, techObj: Ilookup, selectedTechStacks: ISelectedTechs[]): boolean {
    let isSelected = selectedTechStacks.find(el => el.techCode === techObj.c && el.expertCode === level.c);
    return isSelected ? true : false;
  }
}
