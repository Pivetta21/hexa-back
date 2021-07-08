import { UserDto } from './user.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto extends PickType(UserDto, [
  'name',
  'email',
] as const) {
  @IsNotEmpty()
  @Length(4, 400)
  @ApiProperty({ example: 'test001' })
  password: string;
}
