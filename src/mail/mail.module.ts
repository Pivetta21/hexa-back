import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailConfirmationRepository } from './../repositories/email-confirmation.repository';
import { Module } from '@nestjs/common';
import { MailService } from './service/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailConfirmationRepository])],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
