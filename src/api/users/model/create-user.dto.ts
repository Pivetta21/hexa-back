import { OmitType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'signUpDate',
] as const) {
  @ApiProperty({ example: 'test001' })
  @IsNotEmpty()
  @Length(4, 400)
  password: string;
}
