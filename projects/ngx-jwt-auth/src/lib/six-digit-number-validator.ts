import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function sixDigitNumberValidator (): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const pattern = /^\d{6}$/;
    const isValid = pattern.test(value);
    return isValid ? null : { sixDigitNumber: true };
  };
}
