import { FileDto } from '../model/file.dto';

import { StorageService } from '../service/storage.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('images')
  @UseInterceptors(
    FileInterceptor('file', StorageService.getImagesDiskStorage()),
  )
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: FileDto })
  uploadImage(@UploadedFile() file: Express.Multer.File): Promise<FileDto> {
    return Promise.resolve(file);
  }

  @Post('videos')
  @UseInterceptors(
    FileInterceptor('file', StorageService.getVideosDiskStorage()),
  )
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: FileDto })
  uploadVideo(@UploadedFile() file: Express.Multer.File): Promise<FileDto> {
    return Promise.resolve(file);
  }

  @Get('images/:id/:filename')
  @ApiOkResponse()
  findImage(@Res() res, @Param() params: any): Promise<any> {
    return res.sendFile(
      StorageService.getFilePath(
        process.env.STORAGE_DIR + `/${params.id}/`,
        params.filename,
      ),
    );
  }

  @Get('videos/:userId/:courseId/:videoId/:filename')
  @ApiOkResponse()
  findVideo(@Res() res, @Param() params: any): Promise<any> {
    return res.sendFile(
      StorageService.getFilePath(
        `${process.env.STORAGE_DIR}/${params.userId}/${params.courseId}/${params.videoId}/`,
        params.filename,
      ),
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
  @ApiQuery({ name: 'courseId', required: true })
  @ApiOkResponse()
  deleteCourseImage(
    @Req() req: any,
    @Query('courseId') courseId: number,
    @Param('filename') filename: string,
  ) {
    return this.storageService.deleteCourseImage(req.user, courseId, filename);
  }

  @Delete('videos/:filename')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'moduleId', required: true })
  @ApiQuery({ name: 'videoId', required: true })
  @ApiOkResponse()
  deleteVideo(
    @Req() req: any,
    @Query('moduleId') moduleId: number,
    @Query('videoId') videoId: number,
    @Param('filename') filename: string,
  ) {
    return this.storageService.deleteVideo(
      req.user,
      moduleId,
      videoId,
      filename,
    );
  }
}
