import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nameField = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  emailField = new FormControl('');
  telField = new FormControl('');
  colorField = new FormControl('#000000');
  dateField = new FormControl('');
  ageField = new FormControl('');
  rangeField = new FormControl('');
  weekField = new FormControl('');

  /* Selects */
  categoryForm = new FormControl('category-1');
  tagsForm = new FormControl();
  agreeField = new FormControl(false);
  genderField = new FormControl('');
  zoneField = new FormControl('');

  ngOnInit(): void {
    //Para recibir el valor del form de forma reactiva
    this.nameField.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInValid() {
    return this.nameField.touched && this.nameField.invalid;
  }


}
