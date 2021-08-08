import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ModuleDto } from '../model/module.dto';
import { CreateModuleDto } from '../model/createModule.dto';

import { ModuleRepository } from '../../../repositories/module.repository';

@Injectable()
export class ModulesService {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  findAll(courseId?: number): Promise<ModuleDto[]> {
    if (courseId) {
      return this.moduleRepository.find({
        order: { id: 'DESC' },
        where: { course: { id: courseId } },
      });
    }

    return this.moduleRepository.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ModuleDto> {
    return this.findModuleById(id);
  }

  async create(createModuleDto: CreateModuleDto): Promise<ModuleDto> {
    const module = this.moduleRepository.create(createModuleDto);

    return await this.moduleRepository.save(module);
  }

  private async findModuleById(id: number): Promise<ModuleDto> {
    const course = await this.moduleRepository.findOne({
      where: { id: id },
    });

    if (!course) {
      throw new HttpException(
        'Não encontramos esse módulo!',
        HttpStatus.NOT_FOUND,
      );
    }

    return course;
  }
}
