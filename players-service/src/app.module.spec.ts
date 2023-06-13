import { Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';
import { Players, PrismaClient } from '@prisma/client';
import { Response, response } from 'express';

const fakePlayers: Players[] = [
  {
    id: 1,
    name: 'Niko',
    team: 'Faze Clan',
    score: '95',
    avatar: 'img/1_niko.png',
  },
  {
    id: 2,
    name: 'Rain',
    team: 'Faze Clan',
    score: '95',
    avatar: 'img/2_rain.png',
  },
  {
    id: 3,
    name: 'Fer',
    team: 'Sk Gaming',
    score: '92',
    avatar: 'img/3_fer.png',
  },
  {
    id: 4,
    name: 'Coldzera',
    team: 'Sk Gaming',
    score: '90',
    avatar: 'img/4_cold.png',
  },
  {
    id: 5,
    name: 'Fallen',
    team: 'Sk Gaming',
    score: '85',
    avatar: 'img/6_shox.png',
  },
  {
    id: 6,
    name: 'Shox',
    team: 'G2',
    score: '85',
    avatar: 'img/6_shox.png',
  },
  {
    id: 7,
    name: 'Dupreeh',
    team: 'Astralis',
    score: '87',
    avatar: 'img/7_dupreeh.png',
  },
  {
    id: 8,
    name: 'Boltz',
    team: 'Sk Gaming',
    score: '87',
    avatar: 'img/8_boltz.png',
  },
  {
    id: 9,
    name: 'Gla1ve',
    team: 'Faze Clan',
    score: '81',
    avatar: 'img/9_gla1ve.png',
  },
  {
    id: 10,
    name: 'Xyp9x',
    team: 'Astralis',
    score: '81',
    avatar: 'img/10_xyp9x.png',
  },
  {
    id: 11,
    name: 'Taco',
    team: 'Sk Gaming',
    score: '74',
    avatar: 'img/11_taco.png',
  },
  {
    id: 12,
    name: 'Dev1ce',
    team: 'Astralis',
    score: '80',
    avatar: 'img/12_dev1ce.png',
  },
  {
    id: 13,
    name: 'Karrigan',
    team: 'Faze Clan',
    score: '78',
    avatar: 'img/13_karrigan.png',
  },
  {
    id: 14,
    name: 'Apex',
    team: 'G2',
    score: '86',
    avatar: 'img/14_Apex.png',
  },
  {
    id: 15,
    name: 'Rez',
    team: 'Ninja in Pyjamas',
    score: '90',
    avatar: 'img/15_rez.png',
  },
];

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
  it('should return "ProPlayers Service"', () => {
    expect(appController.getHello()).toBe('ProPlayers Service');
  });
  //teste da rota '/players' que deve retornar um array com todos os jogadores
  describe('getAllPlayers', () => {
    it('should return an array with all players', async () => {
      const response = await appController.getAll();
      const { players } = response;
      const mock = await PrismaMock.player.findMany();

      // verifica se o retorno da rota é igual aos dados mockados
      expect(players).toEqual(mock);
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
});
