import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsUrl,
  Length,
} from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  permission: number;

  @ApiProperty({ example: 'Foo Bar' })
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @ApiProperty({ example: 'email@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'https://www.google.com.br/imghp' })
  @IsUrl()
  pictureUrl: string;

  @ApiProperty({ example: '2021-07-05 00:26:06.399+00' })
  @IsDate()
  signUpDate: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  isCreator: boolean;
}
