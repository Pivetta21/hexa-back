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

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

import { ModulesService } from '../service/modules.service';

import { ModuleDto } from '../model/module.dto';
import { CreateModuleDto } from '../model/createModule.dto';

@ApiTags('modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Get()
  @ApiQuery({ name: 'courseId', required: false })
  @ApiOkResponse({ type: ModuleDto, isArray: true })
  findAll(@Query('courseId') courseId?: number): Promise<ModuleDto[]> {
    return this.modulesService.findAll(courseId);
  }

  @Get(':id')
  @ApiOkResponse({ type: ModuleDto })
  findOne(@Param('id') id: number): Promise<ModuleDto> {
    return this.modulesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ModuleDto })
  create(@Body() createCourseDto: CreateModuleDto): Promise<ModuleDto> {
    return this.modulesService.create(createCourseDto);
  }
}
