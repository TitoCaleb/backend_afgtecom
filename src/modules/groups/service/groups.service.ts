import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { GroupsRepositoryImpl } from '../repository/groups.repository';
import { Group } from 'src/domain/Group';
import { Brand } from 'src/domain/Brand';
import { Status } from 'src/utils/enums';
import { In } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(private groupRepository: GroupsRepositoryImpl) {}

  async findAll() {
    return await this.groupRepository.findAll({
      relations: ['brand'],
      where: {
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async findAllByBrand(brand: Brand) {
    return await this.groupRepository.findAll({
      where: {
        brand: brand,
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async findById(group: Group) {
    const response = await this.groupRepository.findOne({
      where: { id: group.id },
    });

    if (!response) {
      throw new NotFoundException('Group not found');
    }

    return response;
  }

  async findByBrandId(brand: Brand) {
    return await this.groupRepository.findAll({
      where: {
        brand: brand,
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async create(group: Group) {
    const existingGroup = await this.groupRepository.findOne({
      where: { name: group.name, status: Status.DELETED },
    });

    if (existingGroup) {
      group.id = existingGroup.id;
      group.status = Status.ACTIVE;
      group.updatedAt = new Date();
      return await this.groupRepository.update(group, existingGroup);
    }

    return await this.groupRepository.create(group);
  }

  async update(group: Group) {
    const groupDb = await this.groupRepository.findOne({
      where: { id: group.id },
    });
    groupDb.updatedAt = new Date();
    return await this.groupRepository.update(group, groupDb);
  }

  async delete(group: Group) {
    const groupDb = await this.groupRepository.findOne({
      where: { id: group.id },
    });

    if (groupDb.status === Status.ACTIVE) {
      throw new HttpException('Brand cannot be deleted', 400);
    }

    const newGroup = new Group({
      ...groupDb,
      status: Status.DELETED,
      updatedAt: new Date(),
    });

    return await this.groupRepository.update(newGroup, groupDb);
  }
}
