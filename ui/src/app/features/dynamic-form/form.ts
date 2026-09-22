import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormArray, FormGroup, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'dynamic-form',
  imports: [ReactiveFormsModule],
  templateUrl: 'form.html',
  styleUrl: './../../app.css',
})
export class DynamicForm implements OnInit {
  private formBuilder = inject(FormBuilder);

  userForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    hobbies: this.formBuilder.array([]),
  });

  get hobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }

  ngOnInit() {
    // console.log(this.userForm.controls);
  }
}