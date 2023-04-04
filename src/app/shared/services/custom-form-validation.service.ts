import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomFormValidationService {

  constructor() { }

  
  whiteSpaceValidator(): ValidatorFn {
    return (controls: AbstractControl) => {
      if (!controls?.value?.trim()) {
        return { invalid: true };
      }
      return null;
    };
  }
}
