import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
} from '@nestjs/common';
import { VideosService } from '../service/videos.service';
import { CreateVideoDto } from '../model/create-video.dto';
import { UpdateVideoDto } from '../model/update-video.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { VideoDto } from '../model/video.dto';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VideoDto })
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  @ApiQuery({ name: 'moduleId', required: false })
  @ApiOkResponse({ type: VideoDto, isArray: true })
  findAll(@Query('moduleId') moduleId?: number) {
    return this.videosService.findAll(moduleId);
  }

  @Get(':id')
  @ApiOkResponse({ type: VideoDto })
  findOne(@Param('id') id: number) {
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: VideoDto })
  update(@Param('id') id: number, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  remove(@Param('id') id: number) {
    return this.videosService.remove(id);
  }
}
