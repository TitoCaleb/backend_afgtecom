import { InjectRepository } from '@nestjs/typeorm';
import { Line } from 'src/domain/Line';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export class LinesRepositoryImpl {
  constructor(
    @InjectRepository(Line) private lineRepository: Repository<Line>,
  ) {}

  async findAll(options?: FindManyOptions<Line>): Promise<Line[]> {
    const response = await this.lineRepository.find(options);
    return response;
  }

  async findOne(options: FindOneOptions<Line>): Promise<Line> {
    const response = await this.lineRepository.findOne(options);

    return response;
  }

  async create(request: Line) {
    const response = await this.lineRepository.save(request);
    return response;
  }

  async update(request: Line, lineDb: Line) {
    this.lineRepository.merge(lineDb, request);
    await this.lineRepository.save(lineDb);

    const response = await this.lineRepository.findOne({
      where: { id: lineDb.id },
      relations: ['brand'],
    });

    return response;
  }

  async delete(request: Line) {
    await this.lineRepository.delete(request.id);
    return request;
  }
}
