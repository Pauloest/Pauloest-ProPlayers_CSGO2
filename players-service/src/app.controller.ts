import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Players } from '@prisma/client';
import { Response } from 'express';
export type PlayersResponse = {
  count: number;
  players: Players[];
};
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('players')
  getAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<PlayersResponse> {
    return this.appService.getPlayers({
      skip: Number(skip),
      take: Number(take),
    });
  }
  @Get('img/:imageName')
  getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    return this.appService.getImage(imageName, res);
  }
}
