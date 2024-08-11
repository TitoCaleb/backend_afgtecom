import { CivilStatus } from 'src/domain/CivilStatus';
import { Department } from 'src/domain/Ubigeo/Department';
import { District } from 'src/domain/Ubigeo/District';
import { DocumentType } from 'src/domain/DocumentType';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Province } from 'src/domain/Ubigeo/Province';
import { Repository } from 'typeorm';
import { Rol } from 'src/domain/Rol';

export class BaseRepositoryImpl {
  constructor(
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: Repository<DocumentType>,
    @InjectRepository(CivilStatus)
    private readonly civilStatusRepository: Repository<CivilStatus>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
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

  async findAllDepartment() {
    return await this.departmentRepository.find();
  }

  async findProvinceByDepartmentId(department: Department) {
    return await this.provinceRepository.findBy({
      department: { id: department.id },
    });
  }

  async findDistrictByProvinceId(province: Province) {
    return await this.districtRepository.findBy({
      province: { id: province.id },
    });
  }

  async findDocumentTypeById(request: DocumentType) {
    const response = await this.documentTypeRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('DocumentType not found');
    }
    return response;
  }

  async findCivilStatusById(request: CivilStatus) {
    const response = await this.civilStatusRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('Civil Status not found');
    }
    return response;
  }

  async findRolById(request: Rol) {
    const response = await this.rolRepository.findOneBy({ id: request.id });

    if (!response) {
      throw new NotFoundException('Rol not found');
    }
    return response;
  }
}
