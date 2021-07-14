import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class MailOptionsDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(10, 100)
  @ApiProperty({ example: 'email@email.com' })
  to: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  @ApiProperty({ example: 'Welcome to Hexa!' })
  subject: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  })
  text: string;
}
