import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class UserDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  @ApiProperty({ example: 'Foo Bar' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(10, 100)
  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({ example: 'https://www.google.com.br/imghp' })
  pictureUrl: string;

  @IsString()
  @ApiProperty({ example: '2021-07-05 00:26:06.399+00' })
  signUpDate: string;

  @IsBoolean()
  @ApiProperty({ example: false })
  isCreator: boolean;

  @IsBoolean()
  @ApiProperty({ example: false })
  isEmailValidated: boolean;
}
