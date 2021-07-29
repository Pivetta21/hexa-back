import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Req,
  Query,
} from '@nestjs/common';
import { CoursesService } from '../service/courses.service';
import { CreateCourseDto } from '../model/create-course.dto';
import { UpdateCourseDto } from '../model/update-course.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CourseDto } from '../model/course.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserDto } from '../../users/model/user.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  @ApiQuery({ name: 'channelId', required: false })
  @ApiOkResponse({ type: CourseDto, isArray: true })
  findAll(@Query('channelId') channelId?: number): Promise<CourseDto[]> {
    return this.courseService.findAll(channelId);
  }

  @Get('following')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CourseDto, isArray: true })
  findAllUserFollowingCourses(@Req() request: any): Promise<CourseDto[]> {
    const user: UserDto = request.user;
    return this.courseService.findAllUserFollowingCourses(user);
  }

  @Get(':id')
  @ApiOkResponse({ type: CourseDto })
  findOne(@Param('id') id: number): Promise<CourseDto> {
    return this.courseService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CourseDto })
  create(
    @Req() request: any,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<CourseDto> {
    const user: UserDto = request.user;
    return this.courseService.create(createCourseDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CourseDto })
  update(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDto> {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'channelId', required: true })
  @ApiBearerAuth()
  @ApiNoContentResponse()
  remove(
    @Req() request: any,
    @Param('id') id: number,
    @Query('channelId') channelId: number,
  ): Promise<any> {
    const user: UserDto = request.user;
    return this.courseService.remove(id, channelId, user);
  }
}
