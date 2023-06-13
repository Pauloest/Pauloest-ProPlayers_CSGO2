import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FavoriteDTO } from './dto/create-favorite.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('favorites')
  getAll(): Promise<any> {
    return this.appService.getFavorites();
  }
  @Post('create-favorite')
  saveFavorite(@Body() favorite: FavoriteDTO): Promise<any> {
    return this.appService.saveFavorite(favorite);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.removeFavorite(+id);
  }
  @Get('img/:imageName')
  getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    return this.appService.getImage(imageName, res);
  }
}
