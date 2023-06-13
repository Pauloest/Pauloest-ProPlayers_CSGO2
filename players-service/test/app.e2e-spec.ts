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
  //Teste rota raíz
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('ProPlayers Service');
  });
  //Teste rota players
  it('/players (GET)', () => {
    return request(app.getHttpServer())
      .get('/players')
      .expect(200)
      .expect(Object);
  });
  //Teste rota de imagens
  it('/img/imageName (GET)', () => {
    return request(app.getHttpServer())
      .get('/img/1_niko.png')
      .expect(200)
      .expect(undefined);
  });
});
