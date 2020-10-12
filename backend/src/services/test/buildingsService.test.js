import { buildingsService } from '../buildingsService';
import { buildingsRepo } from '../../repositories/buildingsRepo';

const database = {
  buildings: [
    {
      building_id: 1,
      type: 'mine',
      level: 1,
      hp: 10,
      started_at: '2020-10-12T12:35:36.000Z',
      finished_at: null,
    },
    {
      building_id: 2,
      type: 'farm',
      level: 1,
      hp: 10,
      started_at: '2020-10-12T14:05:32.000Z',
      finished_at: null,
    },
    {
      building_id: 3,
      type: 'barracks',
      level: 1,
      hp: 10,
      started_at: '2020-10-13T09:34:30.000Z',
      finished_at: null,
    },
    {
      building_id: 4,
      type: 'townhall',
      level: 1,
      hp: 10,
      started_at: '2020-10-13T09:34:45.000Z',
      finished_at: null,
    },
  ],
};

test('Returns buildings of a given kingdom', async () => {
  const spy = jest.spyOn(buildingsRepo, 'getBuildings');
  spy.mockReturnValue(database)
  const buildings = await buildingsService.getBuildings(1);
  expect(buildings).toEqual({buildings: database.buildings});
});
