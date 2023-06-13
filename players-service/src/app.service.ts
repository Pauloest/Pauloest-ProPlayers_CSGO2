import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import { Response } from 'express';
import { existsSync } from 'fs';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'ProPlayers Service';
  }

  async getPlayers(params: { skip?: number; take?: number }): Promise<any> {
    const { skip, take } = params;
    const count = await this.prisma.players.count();
    let players;
    if (isNaN(skip) && isNaN(take)) {
      players = await this.prisma.players.findMany({});
    } else if (isNaN(skip)) {
      players = await this.prisma.players.findMany({
        take,
      });
    } else {
      players = await this.prisma.players.findMany({
        skip,
        take,
      });
    }

    return { players, count };
  }

  getImage(imageName: string, res: Response) {
    const imagePath = join(__dirname.replace('/dist', ''), 'img', imageName);

    if (!existsSync(imagePath)) {
      throw new NotFoundException(`Image ${imageName} not found`);
    }
    res.sendFile(imagePath);

    return HttpStatus.OK;
  }
}
