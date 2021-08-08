import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ModuleDto } from '../model/module.dto';
import { CreateModuleDto } from '../model/create-module.dto';

import { ModuleRepository } from '../../../repositories/module.repository';
import { UpdateModuleDto } from '../model/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  findAll(courseId?: number): Promise<ModuleDto[]> {
    if (courseId) {
      return this.moduleRepository.find({
        where: { course: { id: courseId } },
        order: { id: 'ASC' },
      });
    }

    return this.moduleRepository.find();
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

  async update(
    id: number,
    updateModuleDto: UpdateModuleDto,
  ): Promise<ModuleDto> {
    const module = await this.moduleRepository.findOne(id);

    if (!module) {
      throw new HttpException(
        'Não encontramos esse módulo!',
        HttpStatus.NOT_FOUND,
      );
    }

    const newModule = { ...module, ...updateModuleDto };
    await this.moduleRepository.update(id, updateModuleDto);

    return newModule;
  }
}
