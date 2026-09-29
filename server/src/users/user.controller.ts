import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { CreateUserDto, UserDto } from "./dto/user.dto.js";

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.userService.getUsers();
  }

  @Post()
  async addUser(@Body() createUserdto: CreateUserDto):Promise<string> {
    await this.userService.addUser(createUserdto);
    return 'User Successfully Created!';
  }
}