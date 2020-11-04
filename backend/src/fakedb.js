import { registerValidator } from './services';
import { buildingsRepo, troopsRepo } from './repositories';

async function pushData() {
  async function asyncForEach(array, callback) {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < array.length; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      await callback(array[index], index, array);
    }
  }
  const users = [
    {
      username: 'Mate',
      kingdomname: 'MateKingdom',
    },
    {
      username: 'Mark',
      kingdomname: 'MarkKingdom',
    },
    {
      username: 'Zoli',
      kingdomname: 'ZoliKingdom',
    },
    {
      username: 'Oshii',
      kingdomname: 'OshiiKingdom',
    },
    {
      username: 'Kornel',
      kingdomname: 'KornelKingdom',
    },
    {
      username: 'Peter',
      kingdomname: 'PeterKingdom',
    },
    {
      username: 'Kond',
      kingdomname: 'KondKingdom',
    },
    {
      username: 'Viktor',
      kingdomname: 'ViktorKingdom',
    },
    {
      username: 'Aze',
      kingdomname: 'AzeKingdom',
    },
    {
      username: 'Tojas',
      kingdomname: 'TojasKingdom',
    },
  ];
  const troopObject = {
    hp: 10,
    attack: 5,
    defense: 5,
    time: 60,
  };
  await asyncForEach(users, async (element) => {
    const user = await registerValidator.registUser(
      element.username,
      'password',
      element.kingdomname,
    );
    await buildingsRepo.addBuilding('farm', user.kingdomId);
    await troopsRepo.addTroop(user.kingdomId, troopObject);
  });
}
pushData().then(() => {
  // eslint-disable-next-line no-console
  console.log('The database filled up with fake informations!');
  process.exit(0);
});
