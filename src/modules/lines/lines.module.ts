import { Module } from '@nestjs/common';
import { LinesController } from './controller/lines.controller';
import { LinesService } from './service/lines.service';
import { LinesRepositoryImpl } from './repository/lines.repository';
import { SecurityRepositoryImpl } from '../security/repository/security.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Line } from 'src/domain/Line';
import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';
import { Token } from 'src/domain/Token';

@Module({
  imports: [TypeOrmModule.forFeature([Line, Device, Client, Token])],
  controllers: [LinesController],
  providers: [LinesService, LinesRepositoryImpl, SecurityRepositoryImpl],
})
export class LinesModule {}
