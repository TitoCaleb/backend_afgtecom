import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { SubgroupsRepositoryImpl } from '../repository/subgroups.repository';
import { In } from 'typeorm';
import { Status } from 'src/utils/enums';
import { Subgroup } from 'src/domain/Subgroup';
import { Group } from 'src/domain/Group';

@Injectable()
export class SubgroupsService {
  constructor(private subgroupRepository: SubgroupsRepositoryImpl) {}

  async findAll() {
    return await this.subgroupRepository.findAll({
      relations: ['group'],
      where: {
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async findAllByGroup(group: Group) {
    return await this.subgroupRepository.findAll({
      where: {
        group: group,
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async findById(subgroup: Subgroup) {
    const response = await this.subgroupRepository.findOne({
      where: { id: subgroup.id },
    });

    if (!response) {
      throw new NotFoundException('Subgroup not found');
    }

    return response;
  }

  async findByGroupId(group: Group) {
    return await this.subgroupRepository.findAll({
      where: {
        group: group,
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async create(subgroup: Subgroup) {
    const existingGroup = await this.subgroupRepository.findOne({
      where: { name: subgroup.name, status: Status.DELETED },
    });

    if (existingGroup) {
      subgroup.id = existingGroup.id;
      subgroup.status = Status.ACTIVE;
      subgroup.updatedAt = new Date();
      return await this.subgroupRepository.update(subgroup, existingGroup);
    }

    return await this.subgroupRepository.create(subgroup);
  }

  async update(subgroup: Subgroup) {
    const subgroupDb = await this.subgroupRepository.findOne({
      where: { id: subgroup.id },
    });
    subgroupDb.updatedAt = new Date();
    return await this.subgroupRepository.update(subgroup, subgroupDb);
  }

  async delete(subgroup: Subgroup) {
    const subgroupDb = await this.subgroupRepository.findOne({
      where: { id: subgroup.id },
    });

    if (subgroupDb.status === Status.ACTIVE) {
      throw new HttpException('Subgroup cannot be deleted', 400);
    }

    const newSubgroup = new Subgroup({
      ...subgroupDb,
      status: Status.DELETED,
      updatedAt: new Date(),
    });

    return await this.subgroupRepository.update(newSubgroup, subgroupDb);
  }
}
