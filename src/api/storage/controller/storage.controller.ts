import { FileDto } from './../model/file.dto';

import { StorageService } from './../service/storage.service';
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
    return res.sendFile(this.storageService.getImagePath(filename));
  }

  @Delete('images/:filename')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  deleteImage(@Req() req: any, @Param('filename') filename) {
    return this.storageService.deleteImage(req.user, filename);
  }
}
