import { Controller, Get, Res } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { UserDto } from "./dto/user.dto.js";

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.userService.getUsers();
  }
}