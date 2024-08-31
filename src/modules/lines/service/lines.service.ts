import { HttpException, Injectable } from '@nestjs/common';
import { LinesRepositoryImpl } from '../repository/lines.repository';
import { Line } from 'src/domain/Line';
import { Brand } from 'src/domain/Brand';
import { Status } from 'src/utils/enums';
import { In } from 'typeorm';

@Injectable()
export class LinesService {
  constructor(private lineRepository: LinesRepositoryImpl) {}

  async findAll() {
    return await this.lineRepository.findAll({
      relations: ['brand'],
      where: {
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async findById(line: Line) {
    return await this.lineRepository.findOne({
      where: { id: line.id },
    });
  }

  async findByBrandId(brand: Brand) {
    return await this.lineRepository.findAll({
      where: {
        brand: brand,
        status: In([Status.ACTIVE, Status.INACTIVE]),
      },
    });
  }

  async create(line: Line) {
    const existingLine = await this.lineRepository.findOne({
      where: { name: line.name, status: Status.DELETED },
    });

    if (existingLine) {
      line.id = existingLine.id;
      line.status = Status.ACTIVE;
      line.updatedAt = new Date();
      return await this.lineRepository.update(line, existingLine);
    }

    return await this.lineRepository.create(line);
  }

  async update(line: Line) {
    const lineDb = await this.lineRepository.findOne({
      where: { id: line.id },
    });
    lineDb.updatedAt = new Date();
    return await this.lineRepository.update(line, lineDb);
  }

  async delete(line: Line) {
    const lineDb = await this.lineRepository.findOne({
      where: { id: line.id },
    });

    if (lineDb.status === Status.ACTIVE) {
      throw new HttpException('Brand cannot be deleted', 400);
    }

    const newLine = new Line({
      ...lineDb,
      status: Status.DELETED,
      updatedAt: new Date(),
    });

    return await this.lineRepository.update(newLine, lineDb);
  }
}
