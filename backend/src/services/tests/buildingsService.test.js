import { buildingsService } from '../buildingsService';
import { buildingsRepo, resourceRepo } from '../../repositories';

const database = {
  buildings: [
    {
      id: 1,
      type: 'mine',
      level: 1,
      hp: 10,
      started_at: '2020-10-12T12:35:36.000Z',
      finished_at: null,
      kingdom_id: 1
    },
    {
      id: 2,
      type: 'farm',
      level: 1,
      hp: 10,
      started_at: '2020-10-12T14:05:32.000Z',
      finished_at: null,
      kingdom_id: 2,
    },
    {
      id: 3,
      type: 'barracks',
      level: 1,
      hp: 10,
      started_at: '2020-10-13T09:34:30.000Z',
      finished_at: null,
      kingdom_id: 3,
    },
    {
      id: 4,
      type: 'townhall',
      level: 1,
      hp: 10,
      started_at: '2020-10-13T09:34:45.000Z',
      finished_at: null,
      kingdom_id: 4,
    },
  ],
};

test('Returns buildings of a given kingdom', async () => {
  const spy = jest.spyOn(buildingsRepo, 'getBuildings');
  spy.mockReturnValue(database);
  const buildings = await buildingsService.getBuildings(1, 1);
  expect(buildings).toEqual({buildings: database.buildings});
});

test('getSingleBuilding Returns data from a single building', async () => {
  const spy = jest.spyOn(buildingsRepo, 'getSingleBuilding');
  spy.mockReturnValue({results: [database.buildings[0]], fields: []});
  const building = await buildingsService.getSingleBuilding(1, 1);
  expect(building).toEqual(database.buildings[0]);
})

test('getSingleBuilding throws error message when no building was found', async () => {
  const spy = jest.spyOn(buildingsRepo, 'getSingleBuilding');
  spy.mockReturnValue({results: [], fields: []});
  let thrownError = {};
  try {
    await buildingsService.getSingleBuilding(1);
  } catch(err) {
      thrownError = err;
  }
  expect(thrownError.message).toEqual("Something went wrong...");
  expect(thrownError.status).toEqual(400);
})

test('getSingleBuilding throws error message when kingdomId in buildings table does not match with kingdomId from token', async () => {
  const spy = jest.spyOn(buildingsRepo, 'getSingleBuilding');
  spy.mockReturnValue({results: [database.buildings[0]], fields: []});
  let thrownError = {};
  try {
    await buildingsService.getSingleBuilding(1, 2);
  } catch(err) {
      thrownError = err;
  }
  expect(thrownError.message).toEqual("Something went wrong...");
  expect(thrownError.status).toEqual(400);
})
describe('add new building tests', () => {

  test('missing building type', async () => {
    try {
      await buildingsService.addBuilding(undefined, 4);
    } catch (error) {
      expect(error).toEqual({ status: 400, message: 'Type is required' });
    }
  });

  test('wrong building type', async () => {
    try {
      await buildingsService.addBuilding('library', 4);
    } catch (error) {
      expect(error).toEqual({ status: 400, message: 'Wrong type' });
    }
  });

  test('not enough gold', async () => {
    const spy = jest.spyOn(resourceRepo, 'getGoldAmount');
    spy.mockReturnValue([{amount: 80}]);

    try {
      await buildingsService.addBuilding('farm', 1);
    } catch (error) {
      expect(error).toEqual({ status: 400, message: 'You don\'t have enough money'});
    }
  });

  test('good type & enough gold', async () => {
    const spyResource = jest.spyOn(resourceRepo, 'getGoldAmount');
    spyResource.mockReturnValue([{amount: 200}]);

    const spyBuildings = jest.spyOn(buildingsRepo, 'addNewBuilding');
    spyBuildings.mockReturnValue([{
      id: 5,
      type: 'farm',
      level: 1,
      hp: 100,
      started_at: '1603620911',
      finished_at: '1603620971',
      kingdom_id: 2
    }]);

    let resultInfo = await buildingsService.addBuilding('farm', 2);
    expect(resultInfo).toEqual({
      id: 5,
      type: 'farm',
      level: 1,
      hp: 100,
      started_at: '1603620911',
      finished_at: '1603620971',
      kingdom_id: 2
    });
  });


});
