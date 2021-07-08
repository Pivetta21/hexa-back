import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './../../../entities/user.entity';
import { UserRepository } from '../../../repositories/user.repository';
import { AuthService } from './../../auth/service/auth.service';
import { UserDto } from './../model/user.dto';
import { CreateUserDto } from '../model/create-user.dto';
import { UpdateUserDto } from '../model/update-user.dto';
import { LoginUserDto } from '../model/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.findUserByEmail(createUserDto.email);

    if (user) {
      throw new HttpException('E-mail already in use.', HttpStatus.CONFLICT);
    }

    createUserDto.password = await this.authService.hashPassword(
      createUserDto.password,
    );

    const newUser = await this.userRepository.save(createUserDto);

    return this.convertUserToUserDto(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.findUserByEmail(loginUserDto.email);

    if (!user) {
      throw new HttpException('E-mail not found.', HttpStatus.NOT_FOUND);
    }

    const passwordsMatches = await this.authService.comparePasswords(
      loginUserDto.password,
      user.password,
    );

    if (!passwordsMatches) {
      throw new HttpException(
        'Login was not successful.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return 'Login was successful.';
  }

  findAll(name?: string): Promise<UserDto[]> {
    if (name) {
      return this.userRepository.find({ where: { name } });
    }

    return this.userRepository.find({ order: { id: 'ASC' } });
  }

  findOne(id: number): Promise<UserDto> {
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  private findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  private convertUserToUserDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      isCreator: user.isCreator,
      name: user.name,
      pictureUrl: user.pictureUrl,
      signUpDate: user.signUpDate,
    } as UserDto;
  }
}
