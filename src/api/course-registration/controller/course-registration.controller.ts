import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CourseRegistrationService } from '../service/course-registration.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RegisterCourseDto } from '../model/register-course.dto';
import { CourseRegistrationDto } from '../model/course-registration.dto';
import { RateCourseDto } from '../model/rate-course.dto';

@ApiTags('course-registration')
@Controller('course-registration')
export class CourseRegistrationController {
  constructor(
    private readonly courseRegistrationService: CourseRegistrationService,
  ) {}

  @Get('rate/:courseId')
  @ApiOkResponse({ type: 'number' })
  getCourseRate(@Param('courseId') courseId: number): Promise<number> {
    return this.courseRegistrationService.getCourseRate(courseId);
  }

  @Post('rate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: 'number' })
  rateCourse(
    @Body() rateCourseDto: RateCourseDto,
  ): Promise<CourseRegistrationDto> {
    return this.courseRegistrationService.rateCourse(rateCourseDto);
  }

  @Get('courses/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CourseRegistrationDto, isArray: true })
  findUserCourses(
    @Param('userId') userId: number,
  ): Promise<CourseRegistrationDto[]> {
    return this.courseRegistrationService.findUserCourses(userId);
  }

  @Get('is-registered')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'courseId', required: true })
  @ApiOkResponse({ type: 'boolean' })
  checkIfUserIsRegistered(
    @Query('userId') userId: number,
    @Query('courseId') courseId: number,
  ): Promise<boolean> {
    return this.courseRegistrationService.checkIfUserIsRegistered(
      userId,
      courseId,
    );
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CourseRegistrationDto })
  registerToCourse(
    @Body() registerChannelDto: RegisterCourseDto,
  ): Promise<CourseRegistrationDto> {
    return this.courseRegistrationService.registerToCourse(registerChannelDto);
  }
}
