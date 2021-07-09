import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from './user.dto';

export class AuthenticatedUserDto {
  @IsNotEmpty()
  @ApiProperty()
  user: UserDto;

  @IsNotEmpty()
  @ApiProperty()
  token: string;
}
