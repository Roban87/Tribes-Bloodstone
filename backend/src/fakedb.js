import { registerValidator } from './services';
import { buildingsRepo, troopsRepo } from './repositories';

async function pushData() {
  await registerValidator.registUser('Mate', 'password', 'MateKingdom');
  registerValidator.registUser('Mark', 'password', 'MarkKingdom');
  await registerValidator.registUser('Zoli', 'password', 'ZoliKingdom');
  await registerValidator.registUser('Oshii', 'password', 'OshiiKingdom');
  await registerValidator.registUser('Kornel', 'password', 'KornelKingdom');
  await registerValidator.registUser('Peter', 'password', 'PeterKingdom');
  await registerValidator.registUser('Kond', 'password', 'KondKingdom');
  await registerValidator.registUser('Viktor', 'password', 'ViktorKingdom');
  await registerValidator.registUser('Aze', 'password', 'AzeKingdom');
  await registerValidator.registUser('Tojas', 'password', 'TojasKingdom');

  await buildingsRepo.addBuilding('farm', 1);
  await buildingsRepo.addBuilding('farm', 2);
  await buildingsRepo.addBuilding('farm', 3);
  await buildingsRepo.addBuilding('farm', 4);
  await buildingsRepo.addBuilding('farm', 5);
  await buildingsRepo.addBuilding('farm', 6);
  await buildingsRepo.addBuilding('farm', 7);
  await buildingsRepo.addBuilding('farm', 7);
  await buildingsRepo.addBuilding('farm', 9);
  await buildingsRepo.addBuilding('farm', 8);
  await buildingsRepo.addBuilding('farm', 10);

  await troopsRepo.addTroop(1, {
    hp: 10, attack: 5, defense: 5, time: 60,
  });
  await troopsRepo.addTroop(2, {
    hp: 10, attack: 5, defense: 5, time: 60,
  });
  await troopsRepo.addTroop(3, {
    hp: 10, attack: 5, defense: 5, time: 60,
  });
  await troopsRepo.addTroop(4, {
    hp: 10, attack: 5, defense: 5, time: 60,
  });
  await troopsRepo.addTroop(5, {
    hp: 10, attack: 5, defense: 5, time: 60,
  });
  await troopsRepo.addTroop(6, {
    hp: 10, attack: 5, defense: 5, time: 60,
  });
  await troopsRepo.addTroop(7, {
    hp: 10, attack: 5, defense: 5, time: 60,
  });
  await troopsRepo.addTroop(8, {
    hp: 10, attack: 5, defense: 5, time: 60,
  });
  await troopsRepo.addTroop(9, {
    hp: 10, attack: 5, defense: 5, time: 60,
  });
  await troopsRepo.addTroop(10, {
    hp: 10, attack: 5, defense: 5, time: 60,
  });
}
pushData().then(() => {
  console.log('The database filled up with fake informations!');
  process.exit(0);
});
