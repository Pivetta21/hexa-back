import { OmitType } from '@nestjs/swagger';
import { ModuleDto } from './module.dto';

export class CreateModuleDto extends OmitType(ModuleDto, ['id']) {}
