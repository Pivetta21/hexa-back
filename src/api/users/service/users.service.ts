import { MailService } from './../../../mail/service/mail.service';
import { AuthenticatedUserDto } from './../model/authenticated-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { User } from './../../../entities/user.entity';
import { UserRepository } from '../../../repositories/user.repository';
import { AuthService } from '../../../auth/service/auth.service';
import { UserDto } from '../model/user.dto';
import { CreateUserDto } from '../model/create-user.dto';
import { UpdateUserDto } from '../model/update-user.dto';
import { LoginUserDto } from '../model/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  findAll(name?: string): Promise<UserDto[]> {
    if (name) {
      return this.userRepository.find({ where: { name } });
    }

    return this.userRepository.find({ order: { id: 'ASC' } });
  }

  findOne(id: number): Promise<UserDto> {
    return this.findUserById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    await this.verifyIfEmailIsBeingUsed(createUserDto.email);

    createUserDto.password = await this.authService.hashPassword(
      createUserDto.password,
    );

    const newUser = await this.userRepository.save(createUserDto);

    return this.convertUserToUserDto(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthenticatedUserDto> {
    const user = await this.findUserByEmail(loginUserDto.email);

    const passwordsMatches = await this.authService.comparePasswords(
      loginUserDto.password,
      user.password,
    );

    if (!passwordsMatches) {
      throw new HttpException(
        'Não foi possível realizar login.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userDto = this.convertUserToUserDto(user);
    const jwt = await this.authService.generateJwt(userDto);

    return { user: userDto, token: jwt };
  }

  async getEmailConfirmation(email: string) {
    const user = await this.findUserByEmail(email);
    const userDto = this.convertUserToUserDto(user);

    const emailConfirmation = await this.mailService.createEmailConfirmation(
      userDto,
    );

    if (emailConfirmation) {
      this.mailService.sendEmail({
        to: userDto.email,
        subject: `${userDto.name}, confirmação de e-mail.`,
        text: `Seu código é ${emailConfirmation.code} e irá expirar em 24 horas!`,
      });
    } else {
      throw new HttpException(
        'Não foi possível gerar seu código.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async confirmEmail(userDto: UserDto, code: number): Promise<void> {
    const { id } = userDto;

    const user = await this.findUserById(id);

    const isEmailValidated = await this.mailService.verifyEmailConfirmation(
      code,
      user,
    );

    if (isEmailValidated) {
      await this.userRepository.update(user.id, { isEmailValidated: true });

      this.mailService.removeEmailConfirmation(user.id);

      this.mailService.sendEmail({
        to: user.email,
        subject: 'E-mail confirmado com sucesso!',
        text: 'Muito obrigado por confirmar seu e-mail. Seja bem-vindo a Hexa!',
      });
    }
  }

  async update(
    id: number,
    requestUser: UserDto,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const { email, password } = updateUserDto;

    await this.authService.verifyIfUserHasAuthority(requestUser, id);

    const user = await this.findUserById(id);

    if (email) {
      await this.verifyIfEmailIsBeingUsed(email);
      updateUserDto.isEmailValidated = false;
    }

    if (password) {
      updateUserDto.password = await this.authService.hashPassword(password);
    }

    this.userRepository.update(id, updateUserDto);

    const newUser = { ...user, ...updateUserDto };

    return this.convertUserToUserDto(newUser);
  }

  async remove(id: number, requestUser: UserDto): Promise<any> {
    this.authService.verifyIfUserHasAuthority(requestUser, id);

    const result: DeleteResult = await this.userRepository.delete(id);

    if (result.affected == 0) {
      throw new HttpException('Recurso não encontrado.', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  private async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException('Usuário não existe.', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('E-mail não encontrado.', HttpStatus.NOT_FOUND);
    }

    return this.userRepository.findOne({ where: { email } });
  }

  private async verifyIfEmailIsBeingUsed(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('E-mail ja está em uso.', HttpStatus.CONFLICT);
    }
  }

  private convertUserToUserDto(user: User | any): UserDto {
    return {
      id: user.id,
      email: user.email,
      isCreator: user.isCreator,
      name: user.name,
      pictureUrl: user.pictureUrl,
      signUpDate: user.signUpDate,
      isEmailValidated: user.isEmailValidated,
    } as UserDto;
  }
}
