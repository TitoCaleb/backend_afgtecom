import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepositoryImpl } from '../repository/users.repository';
import { BaseRepositoryImpl } from 'src/modules/base/repository/base.repository';
import { User } from 'src/domain/User';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepositoryImpl,
    private baseRepository: BaseRepositoryImpl,
  ) {}

  private async encryptPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findById(user: User) {
    return await this.usersRepository.findById(user);
  }

  async create(request: User) {
    await this.baseRepository.findDocumentTypeById(request.documentTypeId);
    await this.baseRepository.findCivilStatusById(request.civilStatusId);
    await this.baseRepository.findRolById(request.rolId);
    const encryptPassword = await this.encryptPassword(request.password);

    const user = new User({
      id: uuid(),
      ...request,
    });
    user.password = encryptPassword;

    return await this.usersRepository.create(user);
  }

  async update(request: User) {
    const userDb = await this.usersRepository.findById(request);

    if (request.civilStatusId) {
      await this.baseRepository.findCivilStatusById(request.civilStatusId);
    }
    if (request.documentTypeId) {
      await this.baseRepository.findDocumentTypeById(request.documentTypeId);
    }
    if (request.rolId) {
      await this.baseRepository.findRolById(request.rolId);
    }
    if (request.password) {
      throw new HttpException('Password cannot be updated', 400);
    }

    return await this.usersRepository.update(request, userDb);
  }

  async delete(request: User) {
    const userDb = await this.usersRepository.findById(request);
    return await this.usersRepository.delete(userDb);
  }
}
