import { UserDto } from '../../users/model/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import fs = require('fs');
import path = require('path');
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { UserRepository } from 'src/repositories/user.repository';
import { ChannelRepository } from 'src/repositories/channel.repository';
import { CourseRepository } from '../../../repositories/course.repository';

@Injectable()
export class StorageService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly channelRepository: ChannelRepository,
    private readonly courseRepository: CourseRepository,
  ) {}

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
    const user = await this.userRepository.findOne(reqUser.id);

    if (user.pictureUrl) {
      StorageService.removeImage({
        clientFileUrl: user.pictureUrl,
        reqFileName: filename,
      });
    }
  }

  async deleteChannelImage(reqUser: UserDto, filename: string): Promise<void> {
    const channel = await this.channelRepository.findOne({
      where: { user: reqUser.id },
    });

    if (channel.banner_url) {
      StorageService.removeImage({
        clientFileUrl: channel.banner_url,
        reqFileName: filename,
      });
    }
  }

  async deleteCourseImage(
    reqUser: UserDto,
    courseId: number,
    filename: string,
  ): Promise<void> {
    const course = await this.courseRepository.findOne(courseId, {
      relations: ['channel'],
    });

    const channel = await this.channelRepository.findOne({
      where: { user: reqUser.id },
    });

    if (course.channel.id !== channel.id) {
      throw new HttpException('Ação não permitida!', HttpStatus.FORBIDDEN);
    }

    if (course.image_url) {
      StorageService.removeImage({
        clientFileUrl: course.image_url,
        reqFileName: filename,
      });
    }
  }

  private static removeImage(args: {
    clientFileUrl: string;
    reqFileName: string;
  }): void {
    const currentWorkingDirectory = process.cwd();

    const clientPath = path.join(currentWorkingDirectory, args.clientFileUrl);
    const requestPath = path.join(
      currentWorkingDirectory,
      process.env.STORAGE_IMAGES_DIR,
      args.reqFileName,
    );

    if (clientPath != requestPath) {
      throw new HttpException('Ação não permitida!', HttpStatus.FORBIDDEN);
    }

    if (!fs.existsSync(requestPath)) {
      throw new HttpException('Arquivo não encontrado!', HttpStatus.NOT_FOUND);
    } else {
      fs.unlinkSync(requestPath);
    }
  }
}
