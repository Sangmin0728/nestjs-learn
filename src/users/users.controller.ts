import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  BadRequestException,
  Header, Redirect, Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { name, email } = createUserDto;
    return `Add a new user. Name: ${name}, email: ${email}`;
  }

  @Get()
  findAll(@Query() getUsersDto: GetUsersDto) {
    const { offset = 0, limit = 1 } = getUsersDto;
    console.log(`offset: ${offset}, limit: ${limit}`);
    // const users = this.usersService.findAll();
    // return res.status(200).send(users);
    return this.usersService.findAll();
  }

  @Redirect('https://nestjs.com', 301)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if(+id < 1) {
      throw new BadRequestException('id should be bigger than 0')
    }
    return this.usersService.findOne(+id);
  }

  @Header('Custom', 'Test Custom Header insert')
  @Get('test_header/:id')
  findOneWithHeader(@Param('id') id: string) {
    if(+id < 1) {
      throw new BadRequestException('id should be bigger than 0')
    }
    return this.usersService.findOne(+id);
  }

  @HttpCode(202)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Delete(':userId/memo/:memoId')
  deleteUserMemo(
    @Param('userId') userId: string,
    @Param('memoId') memoId: string
  ) {
    return `userId: ${ userId }, memoId: ${ memoId }`
  }
}