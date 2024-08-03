import { Module } from '@nestjs/common';
import { BusinessSectorService } from './service/business-sector.service';
import { BusinessSectorController } from './controller/business-sector.controller';
import { BusinessSectorRepositoryImpl } from './repository/business-sector.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessSector } from 'src/domain/BusinessSector';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessSector, Device, Client, Token])],
  controllers: [BusinessSectorController],
  providers: [
    BusinessSectorService,
    BusinessSectorRepositoryImpl,
    SecurityRepositoryImpl,
  ],
})
export class BusinessSectorModule {}
