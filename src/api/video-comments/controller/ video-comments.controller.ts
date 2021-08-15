import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VideoCommentsService } from '../service/video-comments.service';
import { VideoCommentsDto } from '../model/video-comments.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { CreateVideoCommentsDto } from '../model/create-video-comments.dto';

@ApiTags('video-comments')
@Controller('video-comments')
export class VideoCommentsController {
  constructor(private readonly videoCommentsService: VideoCommentsService) {}

  @Get()
  @ApiQuery({ name: 'videoId', required: true })
  @ApiOkResponse({ type: VideoCommentsDto, isArray: true })
  find(@Query('videoId') videoId: number): Promise<VideoCommentsDto[]> {
    return this.videoCommentsService.find(videoId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VideoCommentsDto })
  create(
    @Body() createVideoCommentsDto: CreateVideoCommentsDto,
  ): Promise<VideoCommentsDto> {
    return this.videoCommentsService.create(createVideoCommentsDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  remove(@Param('id') id: number): Promise<any> {
    return this.videoCommentsService.remove(id);
  }
}
