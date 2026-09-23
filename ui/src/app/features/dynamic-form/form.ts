import { Component, inject, OnInit, signal, output } from "@angular/core";
import { ReactiveFormsModule, FormArray, FormControl, FormBuilder, Validators } from "@angular/forms";
import { UserDto } from "../../domains/user.dto";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'dynamic-form',
  imports: [ReactiveFormsModule],
  templateUrl: 'form.html',
  styleUrl: './../../app.css',
})
export class DynamicForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);

  public user = signal<UserDto>({
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
    this.hobbies.removeAt(index);
  }

  resetForm() {
    this.userForm.reset();
  }

  public saveUser() {
    const userValue = this.userForm.value;

    if (this.isValidUserDto(userValue)) {
      this.user.set(userValue);
    }

    console.log('MY USER: ', this.user());

    this.userService.send(this.user());
  }

  private isValidUserDto(value: Partial<UserDto>): value is UserDto {
    return (
      typeof value.firstName === 'string' &&
      typeof value.lastName === 'string' &&
      typeof value.email === 'string' &&
      Array.isArray(value.hobbies) &&
      value.hobbies.every((hobby): hobby is string => typeof hobby === 'string')
    );
  }
}