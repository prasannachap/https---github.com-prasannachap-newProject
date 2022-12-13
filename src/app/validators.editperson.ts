import { AbstractControl, ValidatorFn } from '@angular/forms';

export function firstNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    try {
      if (control.value != null && control.value.indexOf(' ') != -1) {
        return {
          NameNotAllowed: true,
        };
      }
    } catch (error) {}
    return null;
  };
}

export function middleNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    try {
      if (control.value != null && control.value.indexOf(' ') != -1) {
        return {
          NameNotAllowed: true,
        };
      }
    } catch (error) {}
    return null;
  };
}

export function lastNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      try {
        if (control.value != null && control.value.indexOf(' ') != -1) {
          return {
            NameNotAllowed: true,
          };
        }
      } catch (error) {}
      return null;
    };
}

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      try {
        if (control.value != null && control.value.indexOf(' ') != -1) {
          return {
            NameNotAllowed: true,
          };
        }

        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return {NameNotAllowed:true};
        }
      } catch (error) {}
      return null;
    };
}





