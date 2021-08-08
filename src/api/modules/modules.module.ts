import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../auth/auth.module';
import { ModulesService } from './service/modules.service';

import { ModulesController } from './controller/modules.controller';

import { ModuleRepository } from '../../repositories/module.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleRepository]), AuthModule],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
