import { AuthenticatedUserDto } from './../model/authenticated-user.dto';
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

import { UpdatedEmailConfirmationDto } from '../../../mail/model/update-email-confirmation.dto';

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
  @ApiOkResponse({ type: AuthenticatedUserDto })
  login(@Body() loginUserDto: LoginUserDto): Promise<AuthenticatedUserDto> {
    return this.usersService.login(loginUserDto);
  }

  @Post('confirm-email')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  confirmEmail(
    @Req() request: any,
    @Body() emailConfirmation: UpdatedEmailConfirmationDto,
  ): Promise<void> {
    return this.usersService.confirmEmail(request.user, emailConfirmation.code);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  update(
    @Req() request: any,
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
  remove(@Req() request: any, @Param('id') id: number): Promise<any> {
    return this.usersService.remove(id, request.user);
  }
}
