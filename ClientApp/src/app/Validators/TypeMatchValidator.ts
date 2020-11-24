import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function TypeMatchValidator(formControlName: string, typeName: string): ValidatorFn {
  return; /*(formGroup: FormGroup): ValidationErrors => {
    const control = formGroup.controls[formControlName];

    if (typeof(control.value) !== typeName) {
      console.log(control.value instanceof typeName);
      control.setErrors({mustMatch: true});
    } else {
      control.setErrors(null);
    }
    return;
  };*/
}
