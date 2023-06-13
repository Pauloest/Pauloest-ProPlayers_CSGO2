import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Rota raíz
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('ProPlayers Favorites Service');
  });

  //Teste rota favorites
  it('/favorites (GET)', () => {
    return request(app.getHttpServer())
      .get('/favorites')
      .expect(200)
      .expect(Object);
  });
  //Teste rota fcreate-avorite
  it('/create-favorite (POST)', () => {
    const favoriteDTO = {
      id: 25,
      name: 'Faldldden',
      team: 'Sk Gaming',
      score: '85',
      avatar: 'img/6_shox.png',
    };
    return request(app.getHttpServer())
      .post('/create-favorite')
      .send(favoriteDTO)
      .expect(201);
  });
  //Teste rota de imagens
  it('/img/imageName (GET)', () => {
    return request(app.getHttpServer())
      .get('/img/1_niko.png')
      .expect(200)
      .expect(undefined);
  });
  // Rota delete
  it('/ (DELETE)', () => {
    return request(app.getHttpServer()).delete('/25').expect(200);
  });
});
