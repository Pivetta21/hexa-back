import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CourseDto } from '../model/course.dto';
import { CreateCourseDto } from '../model/create-course.dto';
import { UpdateCourseDto } from '../model/update-course.dto';
import { UserDto } from '../../users/model/user.dto';
import { ChannelDto } from '../../channels/model/channel.dto';
import { CourseRepository } from '../../../repositories/course.repository';
import { ChannelRepository } from '../../../repositories/channel.repository';

import fs = require('fs');

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly channelRepository: ChannelRepository,
  ) {}

  findAllUserFollowingCourses(user: UserDto) {
    return this.courseRepository
      .createQueryBuilder('course')
      .innerJoinAndSelect(
        'course.channel',
        'channel',
        'course.channelId = channel.id',
      )
      .innerJoin(
        'channel.channelToUsers',
        'ctu',
        'ctu.channelId = channel.id AND ctu.userId = :userId',
        { userId: user.id },
      )
      .innerJoinAndSelect('channel.user', 'user', 'user.id = channel.userId')
      .orderBy({ 'course.created_at': 'DESC' })
      .getMany();
  }

  findAll(channelId?: number): Promise<CourseDto[]> {
    if (channelId) {
      return this.courseRepository.find({
        order: { created_at: 'DESC' },
        where: { channel: { id: channelId } },
      });
    }

    return this.courseRepository.find({
      order: { created_at: 'DESC' },
      where: { isPublic: true },
      relations: ['channel', 'channel.user'],
    });
  }

  async findOne(id: number): Promise<CourseDto> {
    const course = await this.courseRepository.findOne({
      where: { id: id },
      relations: ['channel'],
    });

    if (!course) {
      throw new HttpException(
        'Não encontramos esse curso!',
        HttpStatus.NOT_FOUND,
      );
    }

    return course;
  }

  async create(
    createCourseDto: CreateCourseDto,
    user: UserDto,
  ): Promise<CourseDto> {
    const channel = await this.findChannelById(
      createCourseDto.channel.id,
      user,
    );

    const course = await this.courseRepository.save(createCourseDto);

    const coursePath = CoursesService.getCoursePath({
      channelId: channel.id,
      courseId: course.id,
    });

    if (!fs.existsSync(coursePath)) {
      fs.mkdirSync(coursePath, { recursive: true });
    }

    return course;
  }

  async update(
    id: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDto> {
    const course = await this.courseRepository.findOne(id, {
      relations: ['channel'],
    });

    if (!course) {
      throw new HttpException(
        'Não encontramos esse curso!',
        HttpStatus.NOT_FOUND,
      );
    }

    const newCourse = { ...course, ...updateCourseDto };
    await this.courseRepository.update(id, updateCourseDto);

    return newCourse;
  }

  async remove(id: number, channelId: number, user: UserDto): Promise<any> {
    await this.findChannelById(channelId, user);

    const result: DeleteResult = await this.courseRepository.delete(id);

    if (result.affected == 0) {
      throw new HttpException('Recurso não encontrado.', HttpStatus.NOT_FOUND);
    }

    const coursePath = CoursesService.getCoursePath({
      channelId: channelId,
      courseId: id,
    });

    if (fs.existsSync(coursePath)) {
      fs.rmSync(coursePath, { recursive: true });
    }

    return result;
  }

  private static getCoursePath(args: {
    channelId: number;
    courseId: number;
  }): string {
    return `${process.env.STORAGE_VIDEOS_DIR}/channel-${args.channelId}/course-${args.courseId}`;
  }

  private async findChannelById(
    channelId: number,
    user: UserDto,
  ): Promise<ChannelDto> {
    const channel = await this.channelRepository.findOne({
      where: { user: user.id },
    });

    if (!channel) {
      throw new HttpException(
        'Não encontramos o recurso que você deseja!',
        HttpStatus.NOT_FOUND,
      );
    }

    if (channel.id != channelId) {
      throw new HttpException(
        'Não pode acessar esse recurso!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return channel;
  }
}
