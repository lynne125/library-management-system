import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(data: any) {
    return this.prisma.book.create({
      data,
    });
  }

  findAll(
    genreId?: string,
    search?: string,
    page = 1,
    limit = 10,
  ) {
    const where: any = {};

    if (genreId) {
      where.genreId = Number(genreId);
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          author: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    return this.prisma.book.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  update(id: number, data: any) {
    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}