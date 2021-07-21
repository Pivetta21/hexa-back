import { UserDto } from './../../users/model/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import fs = require('fs');
import path = require('path');
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class StorageService {
  constructor(private readonly userRepository: UserRepository) {}

  static getDiskStorage(storageDir: string) {
    return {
      storage: diskStorage({
        destination: storageDir,
        filename: (req, file, cb) => {
          const filename: string = path
            .parse(file.originalname)
            .name.replace(/\s/g, '');
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${filename + uuidv4()}${extension}`);
        },
      }),
    };
  }

  static getFilePath(storageDir: string, filename: string): string {
    return path.join(process.cwd(), storageDir, filename);
  }

  async deleteProfileImage(reqUser: UserDto, filename: string): Promise<void> {
    const cwd = process.cwd();
    const user = await this.userRepository.findOne(reqUser.id);

    const userPath = path.join(cwd, user.pictureUrl);
    const requestPath = path.join(
      cwd,
      process.env.STORAGE_IMAGES_DIR,
      filename,
    );

    if (userPath != requestPath) {
      throw new HttpException('Ação não permitida!', HttpStatus.FORBIDDEN);
    }

    if (!fs.existsSync(requestPath)) {
      throw new HttpException('Arquivo não encontrado!', HttpStatus.NOT_FOUND);
    } else {
      fs.unlinkSync(requestPath);
    }
  }
}
