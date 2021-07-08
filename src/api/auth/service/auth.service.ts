const bcrypt = require('bcrypt');

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(password: string, storedPasswordHash: string): Promise<any> {
    return bcrypt.compare(password, storedPasswordHash);
  }
}
