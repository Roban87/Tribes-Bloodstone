import { regMapService } from '../regMapService';
import { regMapRepo } from '../../repositories/regMapRepo';

const database = {
  kingdoms: [
    {
      id: 1,
      kingdomname: 'king1',
      population: 100,
      location: 'ENG',
    },
    {
      id: 2,
      kingdomname: 'king2',
      population: 200,
      location: 'GER',
    },
    {
      id: 3,
      kingdomname: 'king3',
      population: 150,
      location: 'FRA',
    },
    {
      id: 4,
      kingdomname: 'king4',
      population: 130,
      location: 'HUN',
    },
  ],
};

test('Returns all kingdoms', async () => {
  const spy = jest.spyOn(regMapRepo, 'getRegMap');
  spy.mockReturnValue(database)
  const kingdoms = await regMapService.getRegMap();
  expect(kingdoms).toEqual(database);
});
