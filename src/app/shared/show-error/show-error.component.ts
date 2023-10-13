import { Component, OnInit, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.scss']
})
export class ShowErrorComponent implements OnInit {

  private static readonly errorMessages: any = {
    'required': () => 'This field is required',
    'forbiddenEmail': () => 'Please enter a valid email',
    'whitespace': () => 'Please enter valid input',
    'minlength': (params: any) => 'The min allowed number of characters are ' + params.requiredLength,
    'maxlength': (params: any) => 'The max allowed number of characters are ' + params.requiredLength,
    'pattern': (params: any) => {
      if (params.requiredPattern == '^[A-Za-z ]*$') {
        return 'Only alphabets are allowed';
      }
      if (params.requiredPattern == '^[0-9]*$') {
        return 'Please enter valid number';
      }
      return 'Please Enter a valid value';
    },
    'min': (params: any) => `Atleast ${params.min} is required in this field`,
    'max': (params: any) => `Max value can be ${params.max} only`,
    'ngxEditor': (params: any) => `The max allowed number of characters is ${params.allowedLength} and current characters are ${params.textLength}`,
    'passwordNotMatched': () => 'Confirm password and Password not matched',
    'email': () => 'Please enter a valid email',
    'available': (params: any) => params?.value ? `${params.field} Already Taken` : '',

  };

  @Input()
  public control: any;

  constructor() { }

  ngOnInit() {
  }
  shouldShowErrors(): any {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): any {
    let arr = Object.keys(this.control.errors);
    console.log(arr)
    let msg = this.getMessage(arr[0], this.control.errors[arr[0]]);
    let array = [];
    array.push(msg);
    return array;
  }

  private getMessage(type: string, params: any) {
    return ShowErrorComponent?.errorMessages?.[type]?.(params);
  }
}
