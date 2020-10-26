import { buildingsService } from '../buildingsService';
<<<<<<< HEAD
import { buildingsRepo, resourceRepo } from '../../repositories';

=======
import { buildingsRepo } from '../../repositories/buildingsRepo';
import { resourceRepo } from '../../repositories/resourceRepo';
>>>>>>> 43e0ca7... added unit tests for upgradeBuilding service
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
      level: 2,
      hp: 10,
      started_at: '2020-10-13T09:34:45.000Z',
      finished_at: null,
      kingdom_id: 4,
    },
    {
      id: 5,
      type: 'mine',
      level: 1,
      hp: 10,
      started_at: '2020-10-12T12:35:36.000Z',
      finished_at: null,
      kingdom_id: 4,
    },
    {  
      id: 6,
      type: 'mine',
      level: 10,
      hp: 10,
      started_at: '2020-10-12T12:35:36.000Z',
      finished_at: null,
      kingdom_id: 4,
    },
    {  
      id: 7,
      type: 'mine',
      level: 8,
      hp: 10,
      started_at: '2020-10-12T12:35:36.000Z',
      finished_at: null,
      kingdom_id: 4,
    },
  ],
};

beforeEach(() => {
  const spy4 = jest.spyOn(buildingsRepo, 'upgradeBuilding');
  spy4.mockReturnValue(null);
  const spy5 = jest.spyOn(resourceRepo, 'handlePurchase');
  spy5.mockReturnValue(null);
  const spy6 = jest.spyOn(resourceRepo, 'updateResourceRate');
  spy6.mockReturnValue(null);
});

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
<<<<<<< HEAD
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


=======

test('upgradeBuilding when upgrading mine returns object with updated building stats', async () => {
  const spy = jest.spyOn(buildingsRepo, 'getBuildings');
  spy.mockReturnValue(database.buildings);
  const spy2 = jest.spyOn(resourceRepo, 'getResources');
  spy2.mockReturnValue({results: [{ amount: 2000, type: 'gold' }]});
  const spy3 = jest.spyOn(buildingsRepo, 'getSingleBuilding');
  spy3.mockReturnValue({results: [database.buildings[4]], fields: []});

  const building = await buildingsService.upgradeBuilding(5, 4);
  expect(building).toEqual(database.buildings[4]);
  expect(buildingsRepo.getBuildings).toHaveBeenCalledWith(4);
  expect(resourceRepo.getResources).toHaveBeenCalledWith(4);
  expect(buildingsRepo.upgradeBuilding).toHaveBeenCalledWith(5, 200, 120);
  expect(resourceRepo.handlePurchase).toHaveBeenCalledWith(4, 200);
  expect(resourceRepo.updateResourceRate).toHaveBeenCalledWith(4, 'gold', 10);
  expect(buildingsRepo.getSingleBuilding).toHaveBeenCalledWith(5);
});

test('upgradeBuilding when upgrading farm returns object with updated building stats', async () => {
  const spy = jest.spyOn(buildingsRepo, 'getBuildings');
  spy.mockReturnValue(database.buildings);
  const spy2 = jest.spyOn(resourceRepo, 'getResources');
  spy2.mockReturnValue({results: [{ amount: 2000, type: 'gold' }]});
  const spy3 = jest.spyOn(buildingsRepo, 'getSingleBuilding');
  spy3.mockReturnValue({results: [database.buildings[1]], fields: []});

  const building = await buildingsService.upgradeBuilding(2, 2);
  expect(building).toEqual(database.buildings[1]);
  expect(buildingsRepo.getBuildings).toHaveBeenCalledWith(2);
  expect(resourceRepo.getResources).toHaveBeenCalledWith(2);
  expect(buildingsRepo.upgradeBuilding).toHaveBeenCalledWith(2, 200, 120);
  expect(resourceRepo.handlePurchase).toHaveBeenCalledWith(2, 200);
  expect(resourceRepo.updateResourceRate).toHaveBeenCalledWith(2, 'food', 10);
  expect(buildingsRepo.getSingleBuilding).toHaveBeenCalledWith(2);
});

test('upgradeBuilding returns error when building max level reached', async () => {
  const spy = jest.spyOn(buildingsRepo, 'getBuildings');
  spy.mockReturnValue(database.buildings);

  let thrownError = {};
  try {
    await buildingsService.upgradeBuilding(6, 4);
  } catch(err) {
    thrownError = err;
  }
  expect(thrownError.message).toEqual("Building max level reached");
  expect(thrownError.status).toEqual(400);
  expect(buildingsRepo.getBuildings).toHaveBeenCalledWith(4);
});

test('upgradeBuilding returns error when townhall level is lower than building', async () => {
  const spy = jest.spyOn(buildingsRepo, 'getBuildings');
  spy.mockReturnValue(database.buildings);
  
  let thrownError = {};
  try {
    await buildingsService.upgradeBuilding(7, 4);
  } catch(err) {
    thrownError = err;
  }
  expect(thrownError.message).toEqual("Townhall level is too low");
  expect(thrownError.status).toEqual(400);
  expect(buildingsRepo.getBuildings).toHaveBeenCalledWith(4);
});

test('upgradeBuilding returns error when not enough money', async () => {
  const spy = jest.spyOn(buildingsRepo, 'getBuildings');
  spy.mockReturnValue(database.buildings);
  const spy2 = jest.spyOn(resourceRepo, 'getResources');
  spy2.mockReturnValue({results: [{ amount: 50, type: 'gold' }]});

  let thrownError = {};
  try {
    await buildingsService.upgradeBuilding(5, 4);
  } catch(err) {
    thrownError = err;
  }
  expect(thrownError.message).toEqual("You don't have enough money");
  expect(thrownError.status).toEqual(400);
  expect(buildingsRepo.getBuildings).toHaveBeenCalledWith(4);
  expect(resourceRepo.getResources).toHaveBeenCalledWith(4);
>>>>>>> 43e0ca7... added unit tests for upgradeBuilding service
});
