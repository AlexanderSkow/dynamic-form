import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/user.dto.js";
import { User } from "./interfaces/user.interface.js";

@Injectable()
export class UserService {
  public users: User[] = [
    {
      id: 1,
      firstName: 'Test',
      lastName: 'Pilot',
      email: 'test@gmail.com',
      hobbies: ['basketball', 'running'],
    },
  ];

  public async getUsers(): Promise<User[]> {
    return this.users;
  }

  public async addUser(createUserdto: CreateUserDto) {
    const newUser: User = this.formatUser(createUserdto);
    this.users.push(newUser);
  }

  private formatUser(createUserdto: CreateUserDto): User {
    const id = this.getNewId();
    return { id, ...createUserdto, };
  }

  private getNewId() {
    const lastIdx = this.users.length - 1;
    return this.users.map(({ id }) => id)[lastIdx] + 1;
  }
}