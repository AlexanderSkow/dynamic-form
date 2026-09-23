import { Component, inject, OnInit, signal } from "@angular/core";
import { ReactiveFormsModule, FormArray, FormControl, FormBuilder, Validators } from "@angular/forms";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  hobbies: string[];
}

@Component({
  selector: 'dynamic-form',
  imports: [ReactiveFormsModule],
  templateUrl: 'form.html',
  styleUrl: './../../app.css',
})
export class DynamicForm implements OnInit {
  private formBuilder = inject(FormBuilder);

  public user = signal<User>({
    firstName: '',
    lastName: '',
    email: '',
    hobbies: [],
  });


  userForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    hobbies: this.formBuilder.nonNullable.array<string>([]),
  });

  get hobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }

  ngOnInit() {

  }

  addHobby() {
    this.hobbies.push(new FormControl(''));
  }

  removeHobby(index: number) {
    console.log(index);
    this.hobbies.removeAt(index);
    console.log(this.hobbies.value);
  }

  resetForm() {
    this.userForm.reset();
  }

  public saveUser() {
    const userValue = this.userForm.value;
    console.log(userValue);

    if (this.isValidUser(userValue)) {
      this.user.set(userValue);
    }

    console.log('MY USER: ', this.user());
  }

  private isValidUser(value: Partial<User>): value is User {
    return (
      typeof value.firstName === 'string' &&
      typeof value.lastName === 'string' &&
      typeof value.email === 'string' &&
      Array.isArray(value.hobbies) &&
      value.hobbies.every((hobby): hobby is string => typeof hobby === 'string')
    );
  }
}