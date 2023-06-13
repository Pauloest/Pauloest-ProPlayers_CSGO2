import { Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';
import { Favorites, PrismaClient } from '@prisma/client';
import { Response, response } from 'express';

const fakePlayers: Favorites[] = [];

const PrismaMock = {
  player: {
    create: jest.fn().mockReturnValue(fakePlayers[0]),
    findMany: jest.fn().mockResolvedValue(fakePlayers),
    findUnique: jest.fn().mockResolvedValue(fakePlayers[0]),
    update: jest.fn().mockResolvedValue(fakePlayers[0]),
    delete: jest.fn(),
  },
};

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [PrismaClient],
})
export class AppModuleTest {}

describe('AppController', () => {
  let appController: AppController;
  let prisma: PrismaService;
  let service: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModuleTest, PrismaClient],
    }).compile();

    appController = moduleFixture.get<AppController>(AppController);
    service = moduleFixture.get<AppService>(AppService);
    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  describe('root', () => {
    // Verificação dos componentes do módulo
    it('should be defined"', () => {
      expect(appController).toBeDefined();
      expect(service).toBeDefined();
      expect(prisma).toBeDefined();
    });
  });
  //teste da rota raíz retornando o nome da aplicação
  it('should return "ProPlayers Favorites Service"', () => {
    expect(appController.getHello()).toBe('ProPlayers Favorites Service');
  });
  //teste da rota '/players' que deve retornar um array com todos os jogadores
  describe('getAllPlayers', () => {
    it('should return an array with all players', async () => {
      const response = await appController.getAll();
      const mock = await PrismaMock.player.findMany();

      // verifica se o retorno da rota é igual aos dados mockados
      expect(typeof response).toEqual(typeof mock);
      // verifica se o tipo da resposta é um objeto
      expect(typeof response).toEqual('object');
      // verifica se a função foi chamada exatamente uma vez
      expect(PrismaMock.player.findMany).toBeCalledTimes(1);
    });
  });
  //teste da rota '/img/nomeDaImagem' que deve retornar o avatar do jogador
  describe('getImage', () => {
    it('should return the image', () => {
      const res: Partial<Response> = {
        sendFile: jest.fn(),
      };

      const response = appController.getImage('/1_niko.png', res as Response);
      // verifica se o retorno é o código 200, para o status de requisição 'OK'
      console.log(response);
      expect(response).toBe(200);
      // cerifica se a requisição retorna corretamente o caminho do arquivo solicitado
      expect(res.sendFile).toHaveBeenCalledWith(
        '/home/node/app/src/img/1_niko.png',
      );
    });
  });

  describe('remove', () => {
    it('should remove a favorite by id', async () => {
      const id = '1';
      const removeFavoriteSpy = jest
        .spyOn(service, 'removeFavorite')
        .mockResolvedValue(true);

      const result = await appController.remove(id);

      expect(removeFavoriteSpy).toHaveBeenCalledWith(1);
      expect(result).toEqual(true);
    });
  });

  describe('saveFavorite', () => {
    it('should save a favorite', async () => {
      const favoriteDTO = {
        id: 14,
        name: 'Faldldden',
        team: 'Sk Gaming',
        score: '85',
        avatar: 'img/6_shox.png',
      };
      const saveFavoriteSpy = jest
        .spyOn(service, 'saveFavorite')
        .mockResolvedValue(true);

      const result = await appController.saveFavorite(favoriteDTO);

      expect(saveFavoriteSpy).toHaveBeenCalledWith(favoriteDTO);
      expect(result).toEqual(true);
    });
  });
});
