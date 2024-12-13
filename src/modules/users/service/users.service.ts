import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepositoryImpl } from '../repository/users.repository';
import { BaseRepositoryImpl } from 'src/modules/base/repository/base.repository';
import { QueryUser, User, UserModifyPassword } from 'src/domain/User';
import { generate } from 'generate-password';
import * as bcrypt from 'bcrypt';
import { District } from 'src/domain/District';
import { Province } from 'src/domain/Province';
import { Department } from 'src/domain/Department';
import { Status } from 'src/utils/enums';

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
      throw new HttpException('Password incorrect', 400, {
        description: 'Invalid credentials',
      });
    }
    return isMatch;
  }

  private async validateBase(request: User) {
    await this.baseRepository.findDocumentTypeById(request.documentType);
    await this.baseRepository.findCivilStatusById(request.civilStatus);
    await this.baseRepository.findRolById(request.rol);
  }

  private async validateLocationData(request: User) {
    await this.baseRepository.findDistrictById(request.district);
    await this.baseRepository.findProvinceById(request.province);
    await this.baseRepository.findDepartmentById(request.department);
  }

  async findAll(dynamicQuery: QueryUser, limit: number, offset: number) {
    const total = await this.usersRepository.count({
      where: { status: Status.ACTIVE, ...dynamicQuery },
    });
    const response = await this.usersRepository.findAll({
      relations: ['documentType', 'rol'],
      where: { status: Status.ACTIVE, ...dynamicQuery },
      take: Number(limit),
      skip: Number(offset),
    });

    return {
      response,
      total,
    };
  }

  async findById(user: User) {
    return await this.usersRepository.findById(user, {
      relations: [
        'documentType',
        'civilStatus',
        'rol',
        'district',
        'province',
        'department',
      ],
    });
  }

  async create(request: User) {
    await this.validateBase(request);
    await this.validateLocationData(request);
    await this.baseRepository.validateUbigeo(
      new District({
        id: request.district.id,
        province: request.province,
        department: request.department,
      }),
    );

    const password = generate({
      length: 20,
      numbers: true,
      symbols: true,
      uppercase: true,
    });

    const encryptPassword = await this.encryptPassword(password);
    const newUser = new User({ ...request, password: encryptPassword });
    const { id } = await this.usersRepository.create(newUser);
    const response = await this.usersRepository.findById(new User({ id }), {
      relations: [
        'documentType',
        'civilStatus',
        'rol',
        'district',
        'province',
        'department',
      ],
    });

    response.password = password;
    return response;
  }

  async update(request: User) {
    const userDb = await this.usersRepository.findById(request, {
      relations: [
        'documentType',
        'civilStatus',
        'rol',
        'district',
        'province',
        'department',
      ],
    });
    const { civilStatus, documentType, rol, district, province, department } =
      request;

    if (civilStatus) {
      await this.baseRepository.findCivilStatusById(civilStatus);
    }
    if (documentType) {
      await this.baseRepository.findDocumentTypeById(documentType);
    }
    if (rol) {
      await this.baseRepository.findRolById(rol);
    }
    if (district || province || department) {
      const districtId = district?.id ?? userDb.district?.id;
      const provinceId = province?.id ?? userDb.province?.id;
      const departmentId = department?.id ?? userDb.department?.id;

      if (districtId || provinceId || departmentId) {
        await this.baseRepository.validateUbigeo(
          new District({
            id: districtId,
            province: new Province({ id: provinceId }),
            department: new Department({ id: departmentId }),
          }),
        );
      }
    }

    if (request.password) {
      throw new HttpException('Password cannot be updated', 400);
    }
    userDb.updatedAt = new Date();
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
    user.updatedAt = new Date();
    return await this.usersRepository.update(user, userDb);
  }

  async delete(request: User) {
    const userDb = await this.usersRepository.findById(request);

    if (userDb.status === Status.ACTIVE) {
      throw new HttpException('User cannot be deleted', 400);
    }

    const user = new User(userDb);
    user.updatedAt = new Date();
    user.status = Status.DELETED;

    return await this.usersRepository.update(user, userDb);
  }
}
