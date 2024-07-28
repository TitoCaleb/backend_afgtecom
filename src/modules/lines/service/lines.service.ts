import { Injectable } from '@nestjs/common';
import { LinesRepositoryImpl } from '../repository/lines.repository';
import { Line } from 'src/domain/Line';

@Injectable()
export class LinesService {
  constructor(private lineRepository: LinesRepositoryImpl) {}

  async findAll() {
    return await this.lineRepository.findAll();
  }

  async findById(line: Line) {
    return await this.lineRepository.findById(line);
  }

  async create(line: Line) {
    const newLine = new Line({
      ...line,
      name: line.name.toLocaleUpperCase(),
    });
    return await this.lineRepository.create(newLine);
  }

  async update(line: Line) {
    const lineDb = await this.lineRepository.findById(line);
    line.updateAt = new Date();
    return await this.lineRepository.update(line, lineDb);
  }

  async delete(line: Line) {
    const lineDb = await this.lineRepository.findById(line);
    return await this.lineRepository.delete(lineDb);
  }
}
