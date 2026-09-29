import { Body, Controller, Get, Post, Put, Param, ParseIntPipe, HttpStatus, HttpException, Delete } from "@nestjs/common";
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

  @Get(':id')
  async findUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number
  ): Promise<UserDto> {
    const result = this.userService.findUser(id);

    if (result === undefined) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }

  @Put(':id')
  async editUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
  @Body() editUserDto: UserDto
  ): Promise<string> {
    this.userService.editUser(id, editUserDto);
    return 'User Successfully Edited!';
  }

  @Delete(':id')
  async deleteUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number
  ): Promise<string> {
    this.userService.deleteUser(id);
    return 'User Successfully deleted!';
  }
}