import { Injectable } from "@nestjs/common";
import { CreateUserDto, UserDto } from "./dto/user.dto.js";
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

  public findUser(userId: number): User | undefined {
    return this.users.find(({ id }) => id === userId);
  }

  public editUser(id: number, editUserDto: UserDto) {
    const index = this.findUserIndex(id);
    this.users[index] = editUserDto;
  }

  private formatUser(createUserdto: CreateUserDto): User {
    const id = this.getNewId();
    return { id, ...createUserdto, };
  }

  private getNewId() {
    const lastIdx = this.users.length - 1;
    return this.users.map(({ id }) => id)[lastIdx] + 1;
  }

  private findUserIndex(userId: number) {
    return this.users.findIndex(({ id }) => userId === id);
  }
}