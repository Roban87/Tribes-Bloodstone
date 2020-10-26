import { registerMapService } from '../registerMapService';
import { kingdomRepo } from '../../repositories/';

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
  const spy = jest.spyOn(kingdomRepo, 'getKingdomMap');
  spy.mockReturnValue(database);
  const kingdoms = await registerMapService.getKingdomMap();
  expect(kingdoms).toEqual(database);
});

const postResponse = {
  id: 1,
  name: 'London',
  userId: 1,
  buildings: [
    {
      id: 1,
      type: 'townhall',
      level: 1,
      hp: 1,
      started_at: 12345789,
      finished_at: 12399999,
    },
  ],
  resources: [
    {
      type: 'food',
      amount: 1,
      generation: 1,
    },
    {
      type: 'gold',
      amount: 1,
      generation: 1,
    },
  ],
  troops: [
    {
      id: 1,
      level: 1,
      hp: 1,
      attack: 1,
      defence: 1,
      started_at: 12345789,
      finished_at: 12399999,
    },
  ],
  location: {
    country_code: 'ENG',
  },
};

test('Returns error, missing location', async () => {
  const kingdoms = await registerMapService.checkLocation();
  expect(kingdoms).toEqual({
    message: 'Country code is required.',
    status: 422,
  });
});

test('Returns kingdom data with location', async () => {
  const spy = jest.spyOn(kingdomRepo, 'postRegisterMap');
  spy.mockReturnValue(postResponse);
  const kingdoms = await registerMapService.postRegisterMap(1, 'ENG');
  expect(kingdoms).toEqual(postResponse);
});
