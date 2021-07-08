import { CreateUserDto } from './create-user.dto';
import { PartialType, IntersectionType, OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(
  IntersectionType(
    OmitType(UserDto, ['id', 'signUpDate'] as const),
    CreateUserDto,
  ),
) {}
