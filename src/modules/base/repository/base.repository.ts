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
    const response = await this.provinceRepository.find({
      where: {
        department: { id: department.id },
      },
      relations: ['department'],
    });
    return response;
  }

  async findDistrictByProvinceId(province: Province) {
    const response = await this.districtRepository.find({
      where: { province: { id: province.id } },
      relations: ['province', 'department'],
    });
    return response;
  }

  async validateUbigeo(district: District) {
    const response = await this.districtRepository.findOne({
      where: {
        id: district.id,
        province: { id: district.province.id },
        department: { id: district.department.id },
      },
    });

    if (!response) {
      throw new NotFoundException('Ubigeo not found');
    }

    return response;
  }

  async findDepartmentById(request: Department) {
    const response = await this.departmentRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('Department not found');
    }
    return response;
  }

  async findProvinceById(request: Province) {
    const response = await this.provinceRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('Province not found');
    }
    return response;
  }

  async findDistrictById(request: District) {
    const response = await this.districtRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('District not found');
    }
    return response;
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
