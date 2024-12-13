import { HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from 'src/domain/User';

export class UsersRepositoryImpl {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async count(options?: FindManyOptions<User>): Promise<number> {
    const response = await this.userRepository.count(options);
    return response;
  }

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    const response = await this.userRepository.find(options);
    return response;
  }

  async findById(request: User, options?: FindOneOptions<User>): Promise<User> {
    const response = await this.userRepository.findOne({
      where: { id: request.id },
      ...options,
    });

    if (!response) {
      throw new NotFoundException('User not found');
    }

    return response;
  }

  async findByEmail(request: User): Promise<User> {
    const response = await this.userRepository.findOneBy({
      email: request.email,
    });

    if (!response) {
      throw new HttpException('Bad credentials', 401, {
        description: 'Invalid credentials',
      });
    }

    return response;
  }

  async findByToken(request: User): Promise<User> {
    const response = await this.userRepository.findOneBy({
      tokenId: request.tokenId,
    });

    if (!response) {
      throw new NotFoundException('User not found');
    }

    return response;
  }

  async create(request: User) {
    const response = await this.userRepository.save(request);
    return response;
  }

  async update(request: User, userDb: User) {
    Object.assign(userDb, request);
    const response = await this.userRepository.save(userDb);
    return response;
  }

  async delete(request: User) {
    await this.userRepository.delete(request.id);
    return request;
  }
}
