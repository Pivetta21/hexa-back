import { StorageService } from './../service/storage.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import path = require('path');
import fs = require('fs');

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor() {
    if (!fs.existsSync(StorageService.usersStorageDir)) {
      fs.mkdirSync(StorageService.usersStorageDir);
    }
  }

  @Post('users')
  @UseInterceptors(FileInterceptor('file', StorageService.getUsersStorage()))
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return Promise.resolve(file);
  }

  @Get('users/:filename')
  @ApiOkResponse()
  findUsersImage(@Res() res, @Param('filename') filename): Promise<any> {
    return res.sendFile(
      path.join(process.cwd(), `${StorageService.usersStorageDir}`, filename),
    );
  }

  @Delete('users/:filename')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  delete(@Param('filename') filename) {
    fs.unlink(
      path.join(process.cwd(), `${StorageService.usersStorageDir}`, filename),
      (err) => {
        console.log(err);
      },
    );
  }
}
