import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormbuilderService {

  createFormGroup<T extends Record<string, any>>(model: T): FormGroup {
    const formGroup: { [key: string]: FormControl } = {}
    Object.keys(model).forEach((key) => {
      const isOptional = model[key] === undefined
      const validators = isOptional ? [] : [Validators.required]
      formGroup[key] = new FormControl(model[key], validators)
    })
    return new FormGroup(formGroup)
  }
}
