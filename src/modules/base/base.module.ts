import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CivilStatus } from 'src/domain/CivilStatus';
import { DocumentType } from 'src/domain/DocumentType';
import { Rol } from 'src/domain/Rol';

@Module({
  imports: [TypeOrmModule.forFeature([CivilStatus, DocumentType, Rol])],
})
export class BaseModule {}
