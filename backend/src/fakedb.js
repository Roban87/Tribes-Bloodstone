/* eslint-disable no-console */
import { registerValidator } from './services';
import { buildingsRepo, troopsRepo, kingdomRepo } from './repositories';

async function pushData() {
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
  const locations = [
    'HUN',
    'FRA',
    'GER',
    'SLO',
    'SWI',
    'ITA',
    'POR',
    'GRE',
    'FIN',
    'SPA',
  ];

  await Promise.all(
    users.map(async (user, index) => {
      const newUser = await registerValidator.registUser(
        user.username,
        'password',
        user.kingdomname,
      );
      await buildingsRepo.addBuilding('farm', newUser.kingdomId);
      await troopsRepo.addTroop(newUser.kingdomId, troopObject);
      await kingdomRepo.postRegisterMap(newUser.kingdomId, locations[index]);
    }),
  );
}
pushData()
  .then(() => {
    console.log('The database filled up with fake informations!');
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);

    console.log('Couldn`t fill the database with fake informations!');
    process.exit(1);
  });
