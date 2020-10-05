import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function MatchRevealedValidator(formControlName: string, formControlNameToCompare: string): ValidatorFn{
  return (formGroup: FormGroup): ValidationErrors => {
    const control = formGroup.controls[formControlName];
    const controlToCompare = formGroup.controls[formControlNameToCompare];

    if (control.value !== controlToCompare.value) {
      controlToCompare.setErrors({mustMatch: true});
    } else {
      controlToCompare.setErrors(null);
    }
    return;
  };
}
