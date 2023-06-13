import { PrismaService } from './prisma.service';
const prisma = new PrismaService();
// novo vaminho do avatar para imagens armazenadas na api
async function main() {
  await prisma.players.upsert({
    where: {
      name: 'Niko',
    },
    update: {},
    create: {
      name: 'Niko',
      team: 'Faze Clan',
      score: '95',
      avatar: 'img/1_niko.png',
    },
  });
  await prisma.players.upsert({
    where: {
      name: 'Rain',
    },
    update: {},
    create: {
      name: 'Rain',
      team: 'Faze Clan',
      score: '95',
      avatar: 'img/2_rain.png',
    },
  });

  await prisma.players.upsert({
    where: {
      name: 'Fer',
    },
    update: {},
    create: {
      name: 'Fer',
      team: 'Sk Gaming',
      score: '92',
      avatar: 'img/3_fer.png',
    },
  });

  await prisma.players.upsert({
    where: {
      name: 'Coldzera',
    },
    update: {},
    create: {
      name: 'Coldzera',
      team: 'Sk Gaming',
      score: '90',
      avatar: 'img/4_cold.png',
    },
  });
  await prisma.players.upsert({
    where: {
      name: 'Fallen',
    },
    update: {},
    create: {
      name: 'Fallen',
      team: 'Sk Gaming',
      score: '85',
      avatar: 'img/6_shox.png',
    },
  });
  await prisma.players.upsert({
    where: {
      name: 'Shox',
    },
    update: {},
    create: {
      name: 'Shox',
      team: 'G2',
      score: '85',
      avatar: 'img/6_shox.png',
    },
  });
  await prisma.players.upsert({
    where: {
      name: 'Dupreeh',
    },
    update: {},
    create: {
      name: 'Dupreeh',
      team: 'Astralis',
      score: '87',
      avatar: 'img/7_dupreeh.png',
    },
  });

  await prisma.players.upsert({
    where: {
      name: 'Boltz',
    },
    update: {},
    create: {
      name: 'Boltz',
      team: 'Sk Gaming',
      score: '87',
      avatar: 'img/8_boltz.png',
    },
  });
  await prisma.players.upsert({
    where: {
      name: 'Gla1ve',
    },
    update: {},
    create: {
      name: 'Gla1ve',
      team: 'Faze Clan',
      score: '81',
      avatar: 'img/9_gla1ve.png',
    },
  });
  await prisma.players.upsert({
    where: {
      name: 'Xyp9x',
    },
    update: {},
    create: {
      name: 'Xyp9x',
      team: 'Astralis',
      score: '81',
      avatar: 'img/10_xyp9x.png',
    },
  });
  await prisma.players.upsert({
    where: {
      name: 'Taco',
    },
    update: {},
    create: {
      name: 'Taco',
      team: 'Sk Gaming',
      score: '74',
      avatar: 'img/11_taco.png',
    },
  });

  await prisma.players.upsert({
    where: {
      name: 'Dev1ce',
    },
    update: {},
    create: {
      name: 'Dev1ce',
      team: 'Astralis',
      score: '80',
      avatar: 'img/12_dev1ce.png',
    },
  });
  await prisma.players.upsert({
    where: {
      name: 'Karrigan',
    },
    update: {},
    create: {
      name: 'Karrigan',
      team: 'Faze Clan',
      score: '78',
      avatar: 'img/13_karrigan.png',
    },
  });
  await prisma.players.upsert({
    where: {
      name: 'Apex',
    },
    update: {},
    create: {
      name: 'Apex',
      team: 'G2',
      score: '86',
      avatar: 'img/14_Apex.png',
    },
  });
  await prisma.players.upsert({
    where: {
      name: 'Rez',
    },
    update: {},
    create: {
      name: 'Rez',
      team: 'Ninja in Pyjamas',
      score: '90',
      avatar: 'img/15_rez.png',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
