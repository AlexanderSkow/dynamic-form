import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto.js";

@Injectable()
export class UserService {
  public users: UserDto[] = [
    {
      firstName: 'Test',
      lastName: 'Pilot',
      email: 'test@gmail.com',
      hobbies: ['basketball', 'running'],
    },
  ];

  public async getUsers() {
    return this.users;
  }
}