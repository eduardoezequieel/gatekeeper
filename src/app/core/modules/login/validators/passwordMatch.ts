import {
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

export class CustomValidators {
  
  constructor() {}

  static passwordValidation(control: AbstractControl): ValidationErrors | null {

      const rgxNumber = new RegExp('[0-9]')
      const rgxLetter = new RegExp('[a-zA-Z]')

  
      if( !rgxNumber.test(control.value))  {
        return {'noNumbers': true};
      }
  
      if( !rgxLetter.test(control.value))  {
        return {'noLetters': true};
      }

      return null;
  
  }


  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: AbstractControl) => {

      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
        return {mustMatch: true}
      } else {
        matchingControl?.setErrors(null);
        return null
      }
    };
  }
}