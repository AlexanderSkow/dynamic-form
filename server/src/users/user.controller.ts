import { Body, Controller, Get, Post, Put, Param, ParseIntPipe, HttpStatus } from "@nestjs/common";
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

  @Put(':id')
  async editUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
  @Body() editUserDto: UserDto
  ) {
    await this.userService.editUser(id, editUserDto);
    return 'User Successfully Edited!';
  } 
}