import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/User';
import { Repository } from 'typeorm';

export class UsersRepositoryImpl {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const response = await this.userRepository.find();
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

  async create(request: User) {
    const response = await this.userRepository.save(request);
    return response;
  }
}
