import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepositoryImpl } from '../repository/users.repository';
import { BaseRepositoryImpl } from 'src/modules/base/repository/base.repository';
import { User, UserModifyPassword, UserStatus } from 'src/domain/User';
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

  private async matchPassword(request: string, password: string) {
    const isMatch = await bcrypt.compare(password, request);
    if (!isMatch) {
      throw new HttpException('Bad credentials', 401, {
        description: 'Invalid credentials',
      });
    }
    return isMatch;
  }

  async findAll() {
    const response = await this.usersRepository.findAll({
      relations: ['documentType', 'civilStatus', 'rol'],
    });

    return response;
  }

  async findById(user: User) {
    return await this.usersRepository.findById(user);
  }

  async create(request: User) {
    await this.baseRepository.findDocumentTypeById(request.documentType);
    await this.baseRepository.findCivilStatusById(request.civilStatus);
    await this.baseRepository.findRolById(request.rol);
    const encryptPassword = await this.encryptPassword(request.password);

    request.password = encryptPassword;

    return await this.usersRepository.create(request);
  }

  async update(request: User) {
    const userDb = await this.usersRepository.findById(request, {
      relations: ['documentType', 'civilStatus', 'rol'],
    });

    if (request.civilStatus) {
      await this.baseRepository.findCivilStatusById(request.civilStatus);
    }
    if (request.documentType) {
      await this.baseRepository.findDocumentTypeById(request.documentType);
    }
    if (request.rol) {
      await this.baseRepository.findRolById(request.rol);
    }
    if (request.password) {
      throw new HttpException('Password cannot be updated', 400);
    }

    const response = await this.usersRepository.update(request, userDb);

    return response;
  }

  async updatePassword(request: UserModifyPassword) {
    const userDb = await this.usersRepository.findById(
      new User({ id: request.id }),
    );

    await this.matchPassword(userDb.password, request.oldPassword);

    const encryptPassword = await this.encryptPassword(request.newPassword);
    const user = new User(userDb);
    user.password = encryptPassword;

    /* return await this.usersRepository.update(user, userDb); */
  }

  async delete(request: User) {
    const userDb = await this.usersRepository.findById(request);

    if (userDb.getStatus() === UserStatus.ACTIVE) {
      throw new HttpException('User cannot be deleted', 400);
    }

    return await this.usersRepository.delete(userDb);
  }
}
