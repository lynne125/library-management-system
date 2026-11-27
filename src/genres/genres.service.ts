import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateGenreDto) {
    try {
      return await this.prisma.genre.create({ data });
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        (error as { code?: string }).code === 'P2002'
      ) {
        throw new ConflictException(
          `Genre with name "${data.name}" already exists`,
        );
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.genre.findMany();
  }

  findOne(id: number) {
    return this.prisma.genre.findUnique({
      where: { id },
    });
  }

  update(id: number, data: any) {
    return this.prisma.genre.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.genre.delete({
      where: { id },
    });
  }
}