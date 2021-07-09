import { UserDto } from '../../api/users/model/user.dto';
const bcrypt = require('bcrypt');

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwt(user: UserDto): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(password: string, storedPasswordHash: string): Promise<any> {
    return bcrypt.compare(password, storedPasswordHash);
  }

  verifyIfUserHasAuthority(requestUser: UserDto, id: number): void {
    if (requestUser.id != id) {
      throw new UnauthorizedException();
    }
  }
}
