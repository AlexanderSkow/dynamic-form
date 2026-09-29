export class UserDto {
  id: number
  firstName: string;
  lastName: string;
  email: string;
  hobbies: string[];
}

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  hobbies: string[];
}