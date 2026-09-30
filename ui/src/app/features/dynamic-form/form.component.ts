import { Component, inject, OnInit, signal } from "@angular/core";
import { ReactiveFormsModule, FormArray, FormControl, FormBuilder, Validators, FormGroup, AbstractControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDto } from "../../domains/user.dto";
import { UserService } from "../../services/user.service";
import { AlertService } from "../../services/alert.service";
import { USER_VALIDATION_ERROR_MESSAGES } from "../../shared/constants/validation-error.constants";

@Component({
  selector: 'dynamic-form',
  imports: [ReactiveFormsModule],
  templateUrl: 'form.html',
  styleUrl: 'form.css',
})
export class DynamicForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  public userId = signal<null | number>(null);
  public isUserPage = signal<boolean>(false);

  userForm = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    hobbies: this.formBuilder.nonNullable.array<string>([]),
  });

  get hobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }

  ngOnInit() {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    if (userId === null) return;

    const userIdAsNumber = Number(userId);

      this.userId.set(userIdAsNumber);
      this.isUserPage.set(true);

      this.userService.getUser(userIdAsNumber).subscribe((fetchedUser: UserDto) => {
        this.userForm.patchValue(fetchedUser);

        fetchedUser.hobbies.forEach((hobby: string) => {
          this.addHobby(hobby);
        });
      });
  }

  addHobby(value: string = '') {
    const newControl = new FormControl(value);
    newControl.addValidators([Validators.required, Validators.minLength(3)]);

    this.hobbies.push(newControl);
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  resetForm() {
    this.userForm.reset();
  }

  public deleteUser() {
    if (!this.isUserPage()) return;
    const userId = this.userId();

    if (typeof userId === 'number') {
      this.userService.deleteUser(userId).subscribe(response => {
        this.alertService.sendMessage(response.message, true);
        this.navigateHome();
      });
    }
  }

  public saveUser() {
    const userValue = this.userForm.value;
    const creationStatus = this.userForm.valid;
    const message = creationStatus ? this.determineSuccessMessage() : this.determineErrorMessage(this.userForm);

    if (creationStatus && this.isValidUserDto(userValue)) {
      this.handleFormSubmission(userValue);
    }

    this.alertService.sendMessage(message, creationStatus);
    this.navigateHome();
  }

  private handleFormSubmission(userValue: Omit<UserDto, 'id'>) {
    if (this.isUserPage()) {
      const userId = this.userId();

      if (typeof userId === 'number') {
        const editUserValue = {id: userId, ...userValue};
        this.userService.editUser(editUserValue, userId).subscribe();      
      }
    } else {
      this.userService.addUser(userValue).subscribe();
    }
  }

  private navigateHome() {
    this.router.navigate(['']);
  }

  private determineSuccessMessage() {
    return this.isUserPage() ? 'User Edited Successfully!' : 'User Created Successfully!';
  }

  private determineErrorMessage(userForm: FormGroup): string {
    const firstName = userForm.controls['firstName'];
    const lastName = userForm.controls['lastName'];
    const email = userForm.controls['email'];
    const hobbies = this.hobbies.controls;

    if (firstName.hasError('required')) {
      return USER_VALIDATION_ERROR_MESSAGES['firstNameRequired'];
    }
    else if (firstName.hasError('minlength')) {
      return USER_VALIDATION_ERROR_MESSAGES['firstNameLength'];
    }
    else if (lastName.hasError('required')) {
      return USER_VALIDATION_ERROR_MESSAGES['lastNameRequired'];
    }
    else if (lastName.hasError('minlength')) {
      return USER_VALIDATION_ERROR_MESSAGES['lastNameLength'];
    }
    else if (email.hasError('required')) {
      return USER_VALIDATION_ERROR_MESSAGES['emailRequired'];
    } 
    else if (email.hasError('email')) {
      return USER_VALIDATION_ERROR_MESSAGES['emailValid'];
    } 
    else if (this.hobbiesNotFilled(hobbies)) {
      return USER_VALIDATION_ERROR_MESSAGES['hobbyRequired'];
    }
    else if (this.hobbiesTooShort(hobbies)) {
      return USER_VALIDATION_ERROR_MESSAGES['hobbyLength'];
    }
    else {
      return 'Unknown user error!';
    }
  }

  private hobbiesNotFilled(hobbies: AbstractControl[]) {
    return hobbies.some(hobby => hobby.hasError('required'));
  }

  private hobbiesTooShort(hobbies: AbstractControl[]) {
    return hobbies.some(hobby => hobby.hasError('minlength'));
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