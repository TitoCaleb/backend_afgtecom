import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/domain/Group';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export class GroupsRepositoryImpl {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
  ) {}

  async findAll(options?: FindManyOptions<Group>): Promise<Group[]> {
    const response = await this.groupRepository.find(options);
    return response;
  }

  async findOne(options: FindOneOptions<Group>): Promise<Group> {
    const response = await this.groupRepository.findOne(options);

    return response;
  }

  async create(request: Group) {
    const response = await this.groupRepository.save(request);
    return response;
  }

  async update(request: Group, lineDb: Group) {
    this.groupRepository.merge(lineDb, request);
    await this.groupRepository.save(lineDb);

    const response = await this.groupRepository.findOne({
      where: { id: lineDb.id },
      relations: ['brand'],
    });

    return response;
  }

  async delete(request: Group) {
    await this.groupRepository.delete(request.id);
    return request;
  }
}
