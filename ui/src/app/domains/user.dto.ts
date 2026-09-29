export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hobbies: string[];
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  hobbies: string[];
}