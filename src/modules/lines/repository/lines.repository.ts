import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Line } from 'src/domain/Line';
import { FindManyOptions, Repository } from 'typeorm';

export class LinesRepositoryImpl {
  constructor(
    @InjectRepository(Line) private lineRepository: Repository<Line>,
  ) {}

  async findAll(options?: FindManyOptions<Line>): Promise<Line[]> {
    const response = await this.lineRepository.find(options);
    return response;
  }

  async findById(request: Line): Promise<Line> {
    const response = await this.lineRepository.findOneBy({
      id: request.id,
    });

    if (!response) {
      throw new NotFoundException('Line not found');
    }

    return response;
  }

  async create(request: Line) {
    const response = await this.lineRepository.save(request);
    return response;
  }

  async update(request: Line, lineDb: Line) {
    this.lineRepository.merge(lineDb, request);
    const response = await this.lineRepository.save(lineDb);
    return response;
  }

  async delete(request: Line) {
    await this.lineRepository.delete(request.id);
    return request;
  }
}
