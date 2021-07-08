import { LoginUserDto } from './../model/login-user.dto';
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
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../model/create-user.dto';
import { UpdateUserDto } from '../model/update-user.dto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse()
  login(@Body() loginUserDto: LoginUserDto): Promise<string> {
    return this.usersService.login(loginUserDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserDto })
  update(
    @Req() request,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.update(id, request.user, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  remove(@Req() request, @Param('id') id: number): Promise<any> {
    return this.usersService.remove(id, request.user);
  }
}
