import { HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from 'src/domain/User';

export class UsersRepositoryImpl {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    const response = await this.userRepository.find(options);
    return response;
  }

  async findById(request: User): Promise<User> {
    const response = await this.userRepository.findOneBy({
      id: request.id,
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

  async create(request: User) {
    const response = await this.userRepository.save(request);
    return response;
  }

  async update(request: User, userDb: User) {
    this.userRepository.merge(userDb, request);
    const response = await this.userRepository.save(userDb);
    return response;
  }
}
