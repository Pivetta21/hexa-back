import { Injectable } from '@nestjs/common';

import path = require('path');
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  public static readonly usersStorageDir = `${process.env.STORAGE_DIR}/users`;

  public static getUsersStorage() {
    return {
      storage: diskStorage({
        destination: StorageService.usersStorageDir,
        filename: (req, file, cb) => {
          cb(null, StorageService.parseFilename(file.originalname));
        },
      }),
    };
  }

  public static parseFilename(originalname: string): string {
    const filename: string = path.parse(originalname).name.replace(/\s/g, '');
    const extension: string = path.parse(originalname).ext;

    return `${filename + uuidv4()}${extension}`;
  }
}
