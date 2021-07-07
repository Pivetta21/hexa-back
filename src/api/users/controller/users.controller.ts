import { UserDto } from './../model/user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../model/create-user.dto';
import { UpdateUserDto } from '../model/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiOkResponse({ type: UserDto, isArray: true })
  findAll(@Query('name') name?: string): Promise<UserDto[]> {
    return this.usersService.findAll(name);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  findOne(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: UserDto })
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: UserDto })
  remove(@Param('id') id: number): Promise<any> {
    return this.usersService.remove(id);
  }
}
