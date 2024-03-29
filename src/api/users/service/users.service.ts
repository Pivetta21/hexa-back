import { MailService } from '../../../mail/service/mail.service';
import { AuthenticatedUserDto } from '../model/authenticated-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { UserRepository } from '../../../repositories/user.repository';
import { AuthService } from '../../../auth/service/auth.service';
import { UserDto } from '../model/user.dto';
import { CreateUserDto } from '../model/create-user.dto';
import { UpdateUserDto } from '../model/update-user.dto';
import { LoginUserDto } from '../model/login-user.dto';

const fs = require('fs');

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

    const user = await this.userRepository.save(createUserDto);

    const userPath = UsersService.getUserPath(user.id);
    if (!fs.existsSync(userPath)) {
      fs.mkdirSync(userPath, { recursive: true });
    }

    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthenticatedUserDto> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: [
        'id',
        'name',
        'email',
        'password',
        'pictureUrl',
        'signUpDate',
        'isEmailValidated',
      ],
    });

    if (!user) {
      throw new HttpException('E-mail não encontrado.', HttpStatus.NOT_FOUND);
    }

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

    const authenticatedUser = Object.assign({}, user);
    delete authenticatedUser.password;

    const jwt = await this.authService.generateJwt(authenticatedUser);

    return { user: authenticatedUser, token: jwt };
  }

  async getEmailConfirmation(email: string) {
    const user = await this.findUserByEmail(email);

    const emailConfirmation = await this.mailService.createEmailConfirmation(
      user,
    );

    if (emailConfirmation) {
      this.mailService.sendEmail({
        to: user.email,
        subject: `${user.name}, confirmação de e-mail.`,
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

      await this.mailService.removeEmailConfirmation(user.id);

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

    await this.userRepository.update(id, updateUserDto);

    return { ...user, ...updateUserDto };
  }

  async remove(id: number, requestUser: UserDto): Promise<any> {
    this.authService.verifyIfUserHasAuthority(requestUser, id);

    const result: DeleteResult = await this.userRepository.delete(id);

    if (result.affected == 0) {
      throw new HttpException('Recurso não encontrado.', HttpStatus.NOT_FOUND);
    }

    const userPath = UsersService.getUserPath(id);
    if (fs.existsSync(userPath)) {
      fs.rmSync(userPath, { recursive: true });
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

    return user;
  }

  private async verifyIfEmailIsBeingUsed(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('E-mail ja está em uso.', HttpStatus.CONFLICT);
    }
  }

  private static getUserPath(userId: number): string {
    return `${process.env.STORAGE_DIR}/${userId}`;
  }
}
