import { FileDto } from '../model/file.dto';

import { StorageService } from '../service/storage.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
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

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('images')
  @UseInterceptors(
    FileInterceptor(
      'file',
      StorageService.getDiskStorage(process.env.STORAGE_IMAGES_DIR),
    ),
  )
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: FileDto })
  uploadImage(@UploadedFile() file: Express.Multer.File): Promise<FileDto> {
    return Promise.resolve(file);
  }

  @Get('images/:filename')
  @ApiOkResponse()
  findImage(@Res() res, @Param('filename') filename): Promise<any> {
    return res.sendFile(
      StorageService.getFilePath(process.env.STORAGE_IMAGES_DIR, filename),
    );
  }

  @Delete('images/profile/:filename')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  deleteProfileImage(@Req() req: any, @Param('filename') filename: string) {
    return this.storageService.deleteProfileImage(req.user, filename);
  }

  @Delete('images/channel/:filename')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  deleteChannelImage(@Req() req: any, @Param('filename') filename: string) {
    return this.storageService.deleteChannelImage(req.user, filename);
  }

  @Delete('images/course/:filename')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  deleteCourseImage(@Req() req: any, @Param('filename') filename: string) {
    return this.storageService.deleteCourseImage(req.user, filename);
  }
}
