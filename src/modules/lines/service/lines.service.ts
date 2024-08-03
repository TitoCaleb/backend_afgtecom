import { Injectable } from '@nestjs/common';
import { LinesRepositoryImpl } from '../repository/lines.repository';
import { Line } from 'src/domain/Line';
import { Brand } from 'src/domain/Brand';

@Injectable()
export class LinesService {
  constructor(private lineRepository: LinesRepositoryImpl) {}

  async findAll() {
    return await this.lineRepository.findAll({
      relations: ['brand'],
    });
  }

  async findById(line: Line) {
    return await this.lineRepository.findById(line);
  }

  async findByBrandId(brand: Brand) {
    return await this.lineRepository.findByBrandId(brand);
  }

  async create(line: Line) {
    return await this.lineRepository.create(line);
  }

  async update(line: Line) {
    const lineDb = await this.lineRepository.findById(line);
    line.updatedAt = new Date();
    return await this.lineRepository.update(line, lineDb);
  }

  async delete(line: Line) {
    const lineDb = await this.lineRepository.findById(line);
    return await this.lineRepository.delete(lineDb);
  }
}
