import { EmailConfirmationDto } from './../model/email-confirmation.dto';
import { EmailConfirmationRepository } from './../../repositories/email-confirmation.repository';
import { UserDto } from './../../api/users/model/user.dto';
import { MailOptionsDto } from './../model/mail-options.dto';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { createTransport, Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor(
    private readonly emailConfirmationRepository: EmailConfirmationRepository,
  ) {
    this.transporter = createTransport({
      service: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(mailOptionsDto: MailOptionsDto) {
    if (process.env.NODE_ENV == 'production') {
      const { to, subject, text } = mailOptionsDto;

      const mailOptions: MailOptions = {
        from: process.env.MAIL_FROM,
        to,
        subject,
        text,
      };

      this.transporter.sendMail(mailOptions);
    }
  }

  removeEmailConfirmation(userId: number): Promise<any> {
    return this.emailConfirmationRepository.delete({ user: userId });
  }

  async createEmailConfirmation(
    userDto: UserDto,
  ): Promise<EmailConfirmationDto> {
    this.checkIfEmailConfirmationIsValidated(userDto);

    const newEmailConfirmation = this.generateEmailConfirmation(userDto.id);

    const emailConfirmation = await this.emailConfirmationRepository.findOne({
      where: { user: userDto.id },
    });

    if (emailConfirmation) {
      const newDate = new Date();
      newDate.setHours(newDate.getHours() + 24);

      await this.emailConfirmationRepository.update(emailConfirmation.id, {
        code: newEmailConfirmation.code,
        expirationDate: newDate.toString(),
      });

      newEmailConfirmation.expirationDate = newDate.toString();

      return newEmailConfirmation;
    } else {
      return this.emailConfirmationRepository.save(newEmailConfirmation);
    }
  }

  async verifyEmailConfirmation(
    code: number,
    userDto: UserDto,
  ): Promise<boolean> {
    this.checkIfEmailConfirmationIsValidated(userDto);

    const emailConfirmation = await this.emailConfirmationRepository.findOne({
      where: { user: userDto.id },
    });

    if (this.isEmailConfirmationExpired(emailConfirmation.expirationDate)) {
      throw new HttpException('Seu código expirou!', HttpStatus.GONE);
    }

    if (emailConfirmation.code != code) {
      throw new HttpException('Código inválido.', HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  private generateEmailConfirmation(userId: number): EmailConfirmationDto {
    return this.emailConfirmationRepository.create({
      user: userId,
      code: Math.floor(Math.random() * (9000 - 1000) + 1000),
    });
  }

  private isEmailConfirmationExpired(sqlDate: string): boolean {
    const date = new Date(sqlDate);
    const today = new Date();

    const userDate = {
      day: date.getUTCDate(),
      month: date.getUTCMonth() + 1,
      year: date.getFullYear(),
    };

    const todayDate = {
      day: today.getUTCDate(),
      month: today.getUTCMonth() + 1,
      year: today.getFullYear(),
    };

    const daysDiff = userDate.day - todayDate.day;

    const year = userDate.year - todayDate.year == 0;
    const month = userDate.month - todayDate.month == 0;
    const day = daysDiff >= 0 && daysDiff <= 1;

    return !(year && month && day);
  }

  private checkIfEmailConfirmationIsValidated(userDto: UserDto): void {
    if (userDto.isEmailValidated) {
      throw new HttpException(
        'Seu e-mail ja está validado!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
