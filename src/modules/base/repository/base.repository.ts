import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CivilStatus } from 'src/domain/CivilStatus';
import { DocumentType } from 'src/domain/DocumentType';
import { Rol } from 'src/domain/Rol';
import { Repository } from 'typeorm';

export class BaseRepositoryImpl {
  constructor(
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: Repository<DocumentType>,
    @InjectRepository(CivilStatus)
    private readonly civilStatusRepository: Repository<CivilStatus>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async findAllDocumentType() {
    return await this.documentTypeRepository.find();
  }
  async findAllCivilStatus() {
    return await this.civilStatusRepository.find();
  }
  async findAllRol() {
    return await this.rolRepository.find();
  }

  async findDocumentTypeById(id: string) {
    const response = await this.documentTypeRepository.findOneBy({ id });

    if (!response) {
      throw new NotFoundException('DocumentType not found');
    }
    return response;
  }

  async findCivilStatusById(id: string) {
    const response = await this.civilStatusRepository.findOneBy({ id });

    if (!response) {
      throw new NotFoundException('Civil Status not found');
    }
    return response;
  }

  async findRolById(id: string) {
    const response = await this.rolRepository.findOneBy({ id });

    if (!response) {
      throw new NotFoundException('Rol not found');
    }
    return response;
  }
}
