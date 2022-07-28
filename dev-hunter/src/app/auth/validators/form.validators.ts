import { ValidationErrors, FormGroup } from '@angular/forms';

export class FormValidators {

    static matchPass(value: string, matchingValue: string) {
        return (formGroup: FormGroup): ValidationErrors | null => {
            const pass = formGroup.controls[value];
            const matchingPass = formGroup.controls[matchingValue];

            if (matchingPass.errors && !matchingPass.errors['matchPass']) {
                return null;
            }

            if (pass.value !== matchingPass.value) {
                matchingPass.setErrors({ matchPass: true });
            } else {
                matchingPass.setErrors(null);
            }
            return null;
        }
    }
}
