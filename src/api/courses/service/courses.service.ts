import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../model/create-course.dto';
import { UpdateCourseDto } from '../model/update-course.dto';
import { CourseRepository } from '../../../repositories/course.repository';
import { ChannelRepository } from '../../../repositories/channel.repository';
import { CourseDto } from '../model/course.dto';
import { DeleteResult } from 'typeorm';
import { UserDto } from '../../users/model/user.dto';
import { ChannelDto } from '../../channels/model/channel.dto';

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly channelRepository: ChannelRepository,
  ) {}

  findAll(): Promise<CourseDto[]> {
    return this.courseRepository.find({ relations: ['channel'] });
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
    await this.findChannelById(createCourseDto.channel.id, user);

    return this.courseRepository.save(createCourseDto);
  }

  async update(
    id: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDto> {
    const course = await this.courseRepository.findOne(id);

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

    return result;
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
