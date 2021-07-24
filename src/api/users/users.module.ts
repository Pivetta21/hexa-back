import { MailModule } from '../../mail/mail.module';
import { AuthModule } from '../../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../repositories/user.repository';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule, MailModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
